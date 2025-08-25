import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import { Team, Worker, teamsApi } from '../services/api';

const NewWork: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [iirsData, setIirsData] = useState('');
  const [saving, setSaving] = useState(false);
  const valid = useMemo(() => Boolean(teamName && workers.length), [teamName, workers]);

  const addWorker = () => {
    if (!id || !name || !iirsData) return;
    setWorkers(w => [...w, { id, name, iirsData }]);
    setId(''); setName(''); setIirsData('');
  };

  const saveTeam = async () => {
    setSaving(true);
    const t: Team = await teamsApi.createTeam(teamName, workers);
    setSaving(false);
    alert(`Team created: ${t.name} (${t.id}) with ${t.workers.length} workers`);
    setTeamName('');
    setWorkers([]);
  };

  return (
    <div className="row">
      <div style={{ width: '100%' }}>
        <Card title="Create New Work/Team">
          <div style={{ marginBottom: 12 }}>
            <label className="label" htmlFor="teamName">Team Name</label>
            <input id="teamName" className="input" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g., Canal Repair Unit C" />
          </div>

          <div className="section-title">Add Workers</div>
          <div className="form-row" style={{ marginBottom: 8 }}>
            <div>
              <label className="label" htmlFor="wid">Worker ID (Aadhaar/PAN)</label>
              <input id="wid" className="input" value={id} onChange={(e) => setId(e.target.value)} placeholder="W-3011 / Aadhaar / PAN" />
            </div>
            <div>
              <label className="label" htmlFor="wname">Worker Name</label>
              <input id="wname" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="label" htmlFor="iirs">IIRS Data (simulated)</label>
            <input id="iirs" className="input" value={iirsData} onChange={(e) => setIirsData(e.target.value)} placeholder="Scan/enter IIRS token" />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button className="button" type="button" onClick={addWorker}>Add Worker</button>
          </div>

          {workers.length > 0 ? (
            <div style={{ marginBottom: 16 }}>
              <div className="section-title">Pending Workers</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {workers.map((w, idx) => (
                  <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px dashed var(--card-border)', padding: 8, borderRadius: 6 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{w.name}</div>
                      <div className="small">ID: {w.id} • IIRS: {w.iirsData}</div>
                    </div>
                    <button className="button secondary" onClick={() => setWorkers(list => list.filter((_, i) => i !== idx))}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="small" style={{ marginBottom: 16 }}>No workers added yet.</div>
          )}

          <button className="button" onClick={saveTeam} disabled={!valid || saving}>
            {saving ? 'Saving…' : 'Save Team'}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default NewWork; 