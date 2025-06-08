import Button from "@/components/button/button";

export default function Home() {
  return (
    <div className="overflow-hidden h-screen w-screen flex flex-col gap-6 items-center justify-center ">
      <Button text="Go to Form" href="/form"/>
      <Button text="Go to Staff" href="/staff"/>
    </div>
  );
}
