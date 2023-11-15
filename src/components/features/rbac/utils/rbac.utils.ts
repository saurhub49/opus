import { RoleTypeAuthorizationConfigurationDTOEntityEnum, RoleTypeAuthorizationConfigurationDTOPermissionEnum } from "../../../../openapi"


export const convertStringToRoleTypeAuthorizationConfigurationDTOEntityEnum = (inputString: string) => {
    const enumValues = Object.values(RoleTypeAuthorizationConfigurationDTOEntityEnum);

    if (enumValues.includes(inputString as typeof enumValues[number])) {
        return inputString as typeof enumValues[number];
    }

    return null;
}

export const convertStringToRoleTypeAuthorizationConfigurationDTOPermissionEnum = (inputString: string) => {
    const enumValues = Object.values(RoleTypeAuthorizationConfigurationDTOPermissionEnum);

    if (enumValues.includes(inputString as typeof enumValues[number])) {
        return inputString as typeof enumValues[number];
    }

    return null;
}