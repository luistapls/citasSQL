const {
  Token,
  User,
  UserPermission,
  Permission,
  UserRole,
  Role,
  RolePermission,
} = require('../database/db');

const functionUserHasPermission = (obj, requiredPermission) =>
  obj.user.user_permissions.find(
    (user_permission) =>
      user_permission.permission.permissionType === requiredPermission,
  );

const functionRoleHasPermission = (obj, requiredPermission) =>
  obj.user.user_roles.find((user_role) =>
    user_role.role.role_permissions.find(
      (role_permission) =>
        role_permission.permission.permissionType === requiredPermission,
    ),
  );

module.exports = async (req, res, next, requiredPermission) => {
  const authorization = req.header('Authorization');

  if (!authorization) {
    return res.status(400).json({
      error: 'Se debe proporcionar un token para realizar esta consulta.',
    });
  }

  const token = authorization.split(' ')[1];

  const tokenObj = await Token.findOne({
    where: {
      token,
    },
    include: {
      model: User,
      include: [
        {
          model: UserPermission,
          include: {
            model: Permission,
          },
        },
        {
          model: UserRole,
          include: {
            model: Role,
            include: {
              model: RolePermission,
              include: {
                model: Permission,
              },
            },
          },
        },
      ],
    },
  });

  if (!tokenObj) {
    return res.status(404).json({
      error: 'El token proporcionado no se ha encontrado en la base de datos.',
    });
  }

  const userPermissionLength = tokenObj.user.user_permissions.length;

  if (userPermissionLength) {
    const userHasPermission = functionUserHasPermission(
      tokenObj,
      requiredPermission,
    );

    if (userHasPermission) {
      req.tokenInfo = tokenObj;
      next();
    } else {
      const roleHasPermission = functionRoleHasPermission(
        tokenObj,
        requiredPermission,
      );

      if (roleHasPermission) {
        req.tokenInfo = tokenObj;
        next();
      } else {
        return res.status(401).json({
          error:
            'El token proporcionado no tiene los permisos necesarios para acceder a esta ruta.',
        });
      }
    }
  } else {
    const roleHasPermission = functionRoleHasPermission(
      tokenObj,
      requiredPermission,
    );

    if (roleHasPermission) {
      req.tokenInfo = tokenObj;
      next();
    } else {
      return res.status(401).json({
        error:
          'El token proporcionado no tiene los permisos necesarios para acceder a esta ruta.',
      });
    }
  }
};
