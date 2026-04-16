import { getIcon, iconList, iconValue } from "@/lib/iconList";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

export default function IconPicker({ value, onChange }:{
    value:iconValue,
    onChange:(value:iconValue)=>void
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = iconList.filter(icon =>
    icon.name.includes(search.toLowerCase())
  );

  return (
    <div className="relative flex flex-col">

      {/* Selected Icon Button */}
      <button
        type="button"
        id="icon-selector"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border bg-gray-100 hover:bg-white transition-colors rounded-lg capitalize"
      >
        {value && <value.icon size={18} />}
        {value ? value.name : "Select Icon"}
      </button>

      {/* Popup */}
      {(
        <div className={`${open?"opacity-100 h-80 overflow-y-auto":"opacity-0 h-0 overflow-y-clip"} transition-all right-0 mt-2  bg-gray-200 rounded-lg shadow-xl p-3`}>

          {/* Search */}
          {/* <input
            type="text"
            placeholder="Search icon..."
            className="w-full border px-2 py-1 rounded mb-2"
            onChange={(e) => setSearch(e.target.value)}
          /> */}

          {/* Grid */}
          <div className="grid px-2 lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 gap-2  ">

            {filteredIcons.map(({ name, icon }:iconValue) => {

                const Icon = getIcon(name)

                return(
                    <div
                        key={name}
                        onClick={() => {
                        onChange({ name, icon });
                        setOpen(false);
                        }}
                        className={`p-2 rounded aspect-square justify-center items-center cursor-pointer transition-all ${value.name==name?"bg-green-100 hover:bg-green-300":"bg-white hover:bg-gray-100"} flex justify-center `}
                    >
                        <Icon className="p-2 w-full h-full min-w-10 min-h-10"/>
                    </div>
            )})}

          </div>
        </div>
      )}
    </div>
  );
}
