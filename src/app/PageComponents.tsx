"use client";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms";

export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-24">
      {/* tinaField zajistí, že na to půjde v editoru kliknout */}
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-6xl font-black mb-4"
      >
        {data.page.title}
      </h1>
      <div className="text-xl opacity-80">
        Povedlo se! Tina je napojená a živě reaguje.
      </div>
    </main>
  );
}