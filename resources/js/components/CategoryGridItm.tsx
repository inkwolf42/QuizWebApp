interface CategoryItemParams{
    name:string
    id:number
    onClick:(value:number)=>void
    selected:boolean
}


const getRandomNonGreenColor = (seed:number) => {
  // 1. Create a pseudo-random hue (0-360) based on your seed
  // We use a simple multiplier to ensure the 'random' number is spread out
  let hue = (seed * 137.5) % 360;

  // 2. If the hue falls in the green range (70 to 170), shift it out.
  // We can just add 100 to push it into the Blues/Purples.
  if (hue >= 70 && hue <= 170) {
    hue = (hue + 100) % 360;
  }

  // 3. Return as a CSS HSL string
  // 70% saturation and 60% lightness keeps the colors bright and consistent
  return `hsl(${Math.floor(hue)}, 70%, 60%)`;
};

export default function CategoryGridItem(data:CategoryItemParams){
    return <button
                type='button'
                onClick={()=>data.onClick(data.id)}
                className={`w-full ${data.selected && "bg-green-400"} bubble flex flex-col gap-2 cursor-pointer `}
                >
                <div className="aspect-square w-full rounded-2xl"
                style={{ backgroundColor: getRandomNonGreenColor(data.id) }}
                ></div>
                <p className="font-semibold text-lg capitalize">{data.name}</p>
            </button>
}
