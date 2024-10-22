export interface ExperienceDetailsValues {
  yearsofexperience: number;
  jobroleid: number;
  isfresher: boolean;
  isexperienced: boolean;
  skills: {
    technologyid: number;
    difficultylevel: number;
    yearsexperience: number;
    isprimary: boolean;
  }[];
  resume: string;
}
