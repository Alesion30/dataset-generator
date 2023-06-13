export const pagePaths = {
  $url: () => ({ pathname: "/" as const }),
  person: {
    $url: () => ({ pathname: "/person" as const }),
    register: {
      $url: () => ({
        pathname: "/person/register" as const,
      }),
    },
    _id: (id: string) => ({
      $url: () => ({
        pathname: "/person/[id]" as const,
        query: { id },
      }),
    }),
  },
  questionnaires: {
    $url: () => ({ pathname: "/questionnaires" as const }),
    register: {
      $url: () => ({
        pathname: "/questionnaires/register" as const,
      }),
    },
    _id: (id: string) => ({
      $url: () => ({
        pathname: "/questionnaires/[id]" as const,
        query: { id },
      }),
    }),
  },
};
