import React, { useEffect, useMemo, useRef, useState } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { Team, Worker, attendanceApi, teamsApi } from '../services/api';
import ImagePicker, { ImagePickerHandle } from '../components/ImagePicker';

const CurrentTeam: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [search, setSearch] = useState('');
  const [verifying, setVerifying] = useState<Record<string, boolean>>({});
  const [matchStatus, setMatchStatus] = useState<Record<string, { status: 'pending'|'matched'|'not_matched'; conf?: number }>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const idImageByWorker = useRef<Record<string, File | null>>({});
  const previewUrlByWorker = useRef<Record<string, string>>({});
  const pickerRef = useRef<Record<string, ImagePickerHandle | null>>({});
  const [chooserOpenFor, setChooserOpenFor] = useState<string | null>(null);

  useEffect(() => {
    teamsApi.listTeams().then(setTeams);
  }, []);

  useEffect(() => {
    if (!selectedTeamId && teams.length > 0) {
      setSelectedTeamId(teams[0].id);
    }
  }, [teams, selectedTeamId]);

  const selectedTeam = useMemo(() => teams.find(t => t.id === selectedTeamId), [teams, selectedTeamId]);

  const filteredWorkers = useMemo(() => {
    const list = selectedTeam?.workers || [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(w => w.name.toLowerCase().includes(q) || w.id.toLowerCase().includes(q));
  }, [selectedTeam, search]);

  const performVerify = async (w: Worker, iirsInput: string) => {
    setVerifying(v => ({ ...v, [w.id]: true }));
    const file = idImageByWorker.current[w.id] || null;
    if (!file) {
      alert('Please capture or upload an ID image before verification.');
      setVerifying(v => ({ ...v, [w.id]: false }));
      return;
    }
    const res = await attendanceApi.verifyId(w.id, iirsInput || w.iirsData, file);
    setVerifying(v => ({ ...v, [w.id]: false }));
    setMatchStatus(m => ({ ...m, [w.id]: { status: res.matched ? 'matched' : 'not_matched', conf: res.confidence } }));
    setChooserOpenFor(null);
  };

  const onMark = async (w: Worker) => {
    setSaving(s => ({ ...s, [w.id]: true }));
    await attendanceApi.markAttendance(selectedTeamId, w.id);
    setSaving(s => ({ ...s, [w.id]: false }));
    alert(`Attendance marked for ${w.name}`);
  };

  const setPicker = (workerId: string, inst: ImagePickerHandle | null) => {
    pickerRef.current[workerId] = inst;
  };

  return (
    <div className="row" style={{ alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <Card title="Teams">
          <div style={{ display: 'grid', gap: 8 }}>
            {teams.map(t => (
              <button key={t.id} className="button secondary" onClick={() => setSelectedTeamId(t.id)}>
                {t.name}
              </button>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ flex: 3, minWidth: 300 }}>
        <Card title={selectedTeam ? selectedTeam.name : 'Select a team'} right={
          <input className="input" placeholder="Search workers" value={search} onChange={(e) => setSearch(e.target.value)} />
        }>
          {!selectedTeam ? (
            <div className="small">Choose a team to view workers.</div>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {filteredWorkers.map(w => (
                <div key={w.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{w.name}</div>
                    <div className="small">ID: {w.id}</div>
                    <div className="small">IIRS: {w.iirsData}</div>
                  </div>
                  <div>
                    <label className="label" htmlFor={`iirs-${w.id}`}>IIRS Token (optional)</label>
                    <input id={`iirs-${w.id}`} className="input" placeholder="Override IIRS token" />
                    {previewUrlByWorker.current[w.id] ? (
                      <div style={{ marginTop: 8 }}>
                        <span className="small">Selected ID image:</span>
                        <img src={previewUrlByWorker.current[w.id]} alt="id preview" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--card-border)', marginLeft: 8 }} />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="small" style={{ marginBottom: 6 }}>Verification</div>
                    <button className="button" onClick={() => setChooserOpenFor(chooserOpenFor === w.id ? null : w.id)} disabled={!!verifying[w.id]}>
                      {verifying[w.id] ? 'Verifying…' : 'Verify'}
                    </button>
                    {chooserOpenFor === w.id ? (
                      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                        <button className="button" type="button" onClick={async () => {
                          await pickerRef.current[w.id]?.openCamera();
                        }}>Capture</button>
                        <button className="button secondary" type="button" onClick={() => pickerRef.current[w.id]?.openFileDialog()}>Upload</button>
                        <button className="button" type="button" onClick={() => {
                          const el = document.getElementById(`iirs-${w.id}`) as HTMLInputElement | null;
                          const val = el?.value || '';
                          performVerify(w, val);
                        }}>Submit</button>
                      </div>
                    ) : null}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StatusBadge status={matchStatus[w.id]?.status || 'pending'} confidence={matchStatus[w.id]?.conf} />
                    <button className="button secondary" onClick={() => onMark(w)} disabled={matchStatus[w.id]?.status !== 'matched' || !!saving[w.id]}>
                      {saving[w.id] ? 'Saving…' : 'Mark Attendance'}
                    </button>
                  </div>
                  <ImagePicker ref={(inst) => setPicker(w.id, inst)} onChange={(file) => {
                    idImageByWorker.current[w.id] = file;
                    if (previewUrlByWorker.current[w.id]) URL.revokeObjectURL(previewUrlByWorker.current[w.id]);
                    previewUrlByWorker.current[w.id] = file ? URL.createObjectURL(file) : '';
                  }} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CurrentTeam; 