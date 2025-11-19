export interface ITeamMember {
  name: string;
  role: string;
  capacity: number;
  currentTasks: number;
}

export interface ITeam {
  name: string;
  members: ITeamMember[];
}
