import api from "./http";
import { USE_MOCKS } from "../config";

export type VerifyResult = { matched: boolean; confidence: number };

export const authApi = {
  login: async (username: string, password: string) => {
    if (!USE_MOCKS) {
      const { data } = await api.post("/login", { username, password });
      return data;
    }
    await new Promise((r) => setTimeout(r, 400));
    return { token: "demo-token", username };
  },
};

export const attendanceApi = {
  verifyId: async (workerId: string, iirsData: string, idImage?: File) => {
    if (!USE_MOCKS) {
      const fd = new FormData();
      fd.append('workerId', workerId);
      fd.append('iirsToken', iirsData);
      if (idImage) fd.append('idImage', idImage);
      const { data } = await api.post<VerifyResult>("/verify-id", fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      return data;
    }
    await new Promise((r) => setTimeout(r, 500));
    const hasImage = Boolean(idImage);
    const baseChance = hasImage ? 0.75 : 0.55;
    const matched = Math.random() < baseChance;
    const confidence = matched ? baseChance + Math.random() * (1 - baseChance) : Math.random() * 0.5;
    const result: VerifyResult = { matched, confidence: Number(confidence.toFixed(2)) };
    return result;
  },
  markAttendance: async (teamId: string, workerId: string) => {
    if (!USE_MOCKS) {
      const { data } = await api.post("/attendance", { teamId, workerId });
      return data;
    }
    await new Promise((r) => setTimeout(r, 350));
    return { ok: true };
  },
};

export type Worker = { id: string; name: string; iirsData: string; present?: boolean };
export type Team = { id: string; name: string; workers: Worker[] };

export const teamsApi = {
  listTeams: async (): Promise<Team[]> => {
    if (!USE_MOCKS) {
      const { data } = await api.get<Team[]>("/teams");
      return data;
    }
    await new Promise((r) => setTimeout(r, 300));
    return [
      {
        id: "team-001",
        name: "Canal Repair Unit A",
        workers: [
          { id: "W-1001", name: "Ravi Kumar", iirsData: "IIRS:RVKMR-1001" },
          { id: "W-1002", name: "Sita Devi", iirsData: "IIRS:STDV-1002" },
          { id: "W-1003", name: "Amit Singh", iirsData: "IIRS:AMSG-1003" },
        ],
      },
      {
        id: "team-002",
        name: "Road Laying Crew B",
        workers: [
          { id: "W-2001", name: "Pooja Sharma", iirsData: "IIRS:PJSH-2001" },
          { id: "W-2002", name: "Vikas Yadav", iirsData: "IIRS:VKYD-2002" },
        ],
      },
    ];
  },
  createTeam: async (name: string, workers: Worker[]) => {
    if (!USE_MOCKS) {
      const { data } = await api.post<Team>("/teams", { name, workers });
      return data;
    }
    await new Promise((r) => setTimeout(r, 500));
    return { id: `team-${Math.floor(Math.random() * 900 + 100)}`, name, workers } as Team;
  },
}; 