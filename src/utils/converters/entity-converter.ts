import { StudentEntity, StudentDTO } from '../../types/person';

export const convertEntityToDTO = (entity: StudentEntity): StudentDTO => {
  const dto: StudentDTO = {
    accountId: entity.account_id,
    githubId: entity.github_id,
    nrEmail: entity.nr_email,
    userEmail: entity.user_email,
    firstname: entity.name,
    lastname: entity.surname,
    university: entity.university,
    levelOfStudy: entity.level_of_study,
    graduationDate: entity.graduation_date,
    country: entity.country,
    isThirteenYo: entity.is_thirteen_yo,
    parentsEmail: entity.parents_email,
    validationStatus: entity.validation_status,
    accountType: entity.account_type
  };

  return dto;
};
