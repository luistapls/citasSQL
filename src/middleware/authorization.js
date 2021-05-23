const { User, UserPermission, Permission } = require('../models/index');

module.exports = (requiredPermission) => async (req, res, next) => {
  try {
    const userObj = await User.findOne({
      where: {
        id: req.user_id,
      },
      include: {
        model: UserPermission,
        as: 'user_permissions',
        include: {
          model: Permission,
          as: 'permission',
        },
      },
    });

    const arrayUserPermissions = userObj.user_permissions;

    const userHasPermission = arrayUserPermissions.find(
      (obj) => obj.permission.permission_type === requiredPermission,
    );
    if (userHasPermission) {
      req.userObj = userObj;
      next();
    } else {
      return res.status(401).json({
        error:
          'El token proporcionado no tiene los permisos necesarios para acceder a esta ruta.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
