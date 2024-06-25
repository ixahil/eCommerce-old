"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { NormalText } from "..";

const ItemsPerPage = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (e) => {
    const limit = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set("limit", limit);

    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <NormalText>Per Page</NormalText>
      <select
        className="form-select bg-slate-200 px-4 py-3"
        name="limit"
        id="limit"
        onChange={(e) => handleSelect(e)}
        defaultValue={searchParams.get("limit")}
      >
        <option value="8">8</option>
        <option value="12">12 </option>
        <option value="16">16 </option>
        <option value="20">20 </option>
        <option value="40">40 </option>
        <option value="100">100 </option>
      </select>
    </div>
  );
};

export default ItemsPerPage;
