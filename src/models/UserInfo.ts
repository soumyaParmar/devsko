export type UserInfoB = {
    FirstName: string,
    LastName: string,
    PhoneNumber: string,
    Gender: string,
    CountryId: number,
    State: string,
    City: string,
    DOB: string,
}

export type UserInfo = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: string,
    countryId: number,
    state: string,
    city: string,
    dob: string,
}

export const userInfoMapper = (user: UserInfoB): UserInfo => {
    return {
        firstName: user.FirstName,
        lastName: user.LastName,
        phoneNumber: user.PhoneNumber,
        gender: user.Gender,
        countryId: user.CountryId,
        state: user.State,
        city: user.City,
        dob: user.DOB
    }
}