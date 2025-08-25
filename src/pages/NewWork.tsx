import { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Plus, User, Users, Scan, CheckCircle2, XCircle, Trash2, Save } from 'lucide-react';

interface NewWorker {
  id: string;
  name: string;
  aadhaarId: string;
  panId?: string;
  phone: string;
  address: string;
  verified: boolean;
}

const NewWork = () => {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [workers, setWorkers] = useState<NewWorker[]>([]);
  
  // Worker form state
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [workerName, setWorkerName] = useState('');
  const [workerAadhaar, setWorkerAadhaar] = useState('');
  const [workerPan, setWorkerPan] = useState('');
  const [workerPhone, setWorkerPhone] = useState('');
  const [workerAddress, setWorkerAddress] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  const handleVerifyWorker = () => {
    if (!workerName || !workerAadhaar) {
      toast({
        title: "Missing Information",
        description: "Please enter worker name and Aadhaar ID",
        variant: "destructive",
      });
      return;
    }

    setVerificationStatus('verifying');
    
    // Simulate IRIS verification
    setTimeout(() => {
      // Simple validation - Aadhaar should be 12 digits
      if (workerAadhaar.replace(/\D/g, '').length === 12) {
        setVerificationStatus('verified');
        toast({
          title: "Verification Successful",
          description: `Worker ${workerName} verified with IRIS database`,
        });
      } else {
        setVerificationStatus('failed');
        toast({
          title: "Verification Failed",
          description: "Invalid Aadhaar ID or worker not found in IRIS",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const handleAddWorker = () => {
    if (verificationStatus !== 'verified') {
      toast({
        title: "Worker Not Verified",
        description: "Please verify the worker before adding to team",
        variant: "destructive",
      });
      return;
    }

    const newWorker: NewWorker = {
      id: Date.now().toString(),
      name: workerName,
      aadhaarId: workerAadhaar,
      panId: workerPan,
      phone: workerPhone,
      address: workerAddress,
      verified: true
    };

    setWorkers([...workers, newWorker]);
    
    // Reset form
    setWorkerName('');
    setWorkerAadhaar('');
    setWorkerPan('');
    setWorkerPhone('');
    setWorkerAddress('');
    setVerificationStatus('idle');
    setShowWorkerForm(false);

    toast({
      title: "Worker Added",
      description: `${newWorker.name} has been added to the team`,
    });
  };

  const handleRemoveWorker = (workerId: string) => {
    setWorkers(workers.filter(worker => worker.id !== workerId));
    toast({
      title: "Worker Removed",
      description: "Worker has been removed from the team",
    });
  };

  const handleSaveTeam = () => {
    if (!teamName || !workLocation || !supervisor || workers.length === 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields and add at least one worker",
        variant: "destructive",
      });
      return;
    }

    // TODO: Replace with actual API call
    console.log('Saving team:', {
      teamName,
      workLocation,
      workDescription,
      supervisor,
      workers
    });

    toast({
      title: "Team Created Successfully",
      description: `Team "${teamName}" has been created with ${workers.length} workers`,
    });

    // Reset form
    setTeamName('');
    setWorkLocation('');
    setWorkDescription('');
    setSupervisor('');
    setWorkers([]);
  };

  return (
    <Layout title="Create New Work Team">
      <div className="space-y-6">
        {/* Team Information */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Team Information</CardTitle>
            <CardDescription>Enter basic details about the new work team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name *</Label>
                <Input
                  id="team-name"
                  placeholder="e.g., Team Alpha"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supervisor">Supervisor Name *</Label>
                <Input
                  id="supervisor"
                  placeholder="e.g., राम कुमार शर्मा"
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-location">Work Location *</Label>
              <Input
                id="work-location"
                placeholder="e.g., Village Road Construction, Sector 15"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-description">Work Description</Label>
              <Textarea
                id="work-description"
                placeholder="Describe the work to be performed..."
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Workers Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Worker Form */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary">Add Workers</CardTitle>
                  <CardDescription>Register workers with ID verification</CardDescription>
                </div>
                {!showWorkerForm && (
                  <Button onClick={() => setShowWorkerForm(true)} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Plus size={16} className="mr-2" />
                    Add Worker
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {showWorkerForm ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="worker-name">Worker Name *</Label>
                    <Input
                      id="worker-name"
                      placeholder="e.g., राजेश कुमार"
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="worker-aadhaar">Aadhaar ID *</Label>
                      <Input
                        id="worker-aadhaar"
                        placeholder="1234-5678-9012"
                        value={workerAadhaar}
                        onChange={(e) => setWorkerAadhaar(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="worker-pan">PAN ID (Optional)</Label>
                      <Input
                        id="worker-pan"
                        placeholder="ABCDE1234F"
                        value={workerPan}
                        onChange={(e) => setWorkerPan(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-phone">Phone Number</Label>
                    <Input
                      id="worker-phone"
                      placeholder="9876543210"
                      value={workerPhone}
                      onChange={(e) => setWorkerPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="worker-address">Address</Label>
                    <Textarea
                      id="worker-address"
                      placeholder="Complete address..."
                      value={workerAddress}
                      onChange={(e) => setWorkerAddress(e.target.value)}
                      rows={2}
                    />
                  </div>

                  {/* Verification */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleVerifyWorker}
                      disabled={verificationStatus === 'verifying'}
                      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                    >
                      {verificationStatus === 'verifying' ? (
                        <>
                          <Scan className="mr-2 h-4 w-4 animate-spin" />
                          Verifying with IRIS...
                        </>
                      ) : (
                        <>
                          <Scan className="mr-2 h-4 w-4" />
                          Verify Worker ID
                        </>
                      )}
                    </Button>

                    {/* Verification Status */}
                    {verificationStatus === 'verified' && (
                      <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <span className="text-success font-medium">Worker Verified</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Worker found in IRIS database</p>
                      </div>
                    )}

                    {verificationStatus === 'failed' && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="text-destructive font-medium">Verification Failed</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Worker not found or invalid ID</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAddWorker}
                      disabled={verificationStatus !== 'verified'}
                      className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Add to Team
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowWorkerForm(false);
                        setVerificationStatus('idle');
                        setWorkerName('');
                        setWorkerAadhaar('');
                        setWorkerPan('');
                        setWorkerPhone('');
                        setWorkerAddress('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <User size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Click "Add Worker" to register new team members</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workers List */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Team Members ({workers.length})</CardTitle>
              <CardDescription>Workers added to this team</CardDescription>
            </CardHeader>
            <CardContent>
              {workers.length > 0 ? (
                <div className="space-y-3">
                  {workers.map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-3 border rounded-lg bg-accent/50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{worker.name}</h4>
                          {worker.verified && (
                            <Badge className="bg-success text-success-foreground text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Aadhaar: {worker.aadhaarId}</p>
                        {worker.phone && (
                          <p className="text-xs text-muted-foreground">Phone: {worker.phone}</p>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveWorker(worker.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No workers added yet</p>
                  <p className="text-sm">Add workers to create the team</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Save Team */}
        <Card className="border-2 border-success/20 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Ready to Create Team?</h3>
                <p className="text-sm text-muted-foreground">
                  {teamName ? `Team: ${teamName}` : 'Enter team details'} | 
                  {workers.length} worker{workers.length !== 1 ? 's' : ''} added
                </p>
              </div>
              <Button
                onClick={handleSaveTeam}
                disabled={!teamName || !workLocation || !supervisor || workers.length === 0}
                className="bg-success hover:bg-success/90 text-success-foreground"
                size="lg"
              >
                <Save className="mr-2 h-5 w-5" />
                Create Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewWork;