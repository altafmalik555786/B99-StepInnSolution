export const rolesJSONData = {
  currentRole: {
    name: "Company",
    role: "0",
    children: {
      currentRole: {
        name: "Super Admin",
        role: "1",
        children: {
          currentRole: {
            name: "Admin",
            role: "2",
            children: {
              currentRole: {
                name: "Super Master",
                role: "3",
                children: {
                  currentRole: {
                    name: "Master",
                    role: "4",
                    children: {
                      currentRole: {
                        name: "Bettor",
                        role: "5",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
