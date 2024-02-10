export type Pose = {
  Id: number;
  Name: string;
  Instructions: string;
  Benefits: string;
};

export type Routine = {
  Id: number,
  Name: string,
  RoutinePoses: RoutinePose[]
};

export type RoutinePose = {
  Pose: Pose,
  DurationInSeconds: number 
};