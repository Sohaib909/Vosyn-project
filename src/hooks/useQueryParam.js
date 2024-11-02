import { useCallback } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryParam = () => {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParam = useCallback(
    (key, value) => {
      const urlSearchParams = new URLSearchParams(search);

      if (value) {
        urlSearchParams.set(key, value);
      } else {
        urlSearchParams.delete(key);
      }

      const newUrl =
        key === "query" && !pathname.includes("search")
          ? `/search?${urlSearchParams.toString()}`
          : `${pathname}?${urlSearchParams.toString()}`;

      router.replace(newUrl);
    },
    [pathname, search, router],
  );

  const getAllParams = useCallback(() => {
    const urlSearchParams = new URLSearchParams(search);
    const params = {};
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [search]);

  return { updateQueryParam, getAllParams };
};

export default useQueryParam;
