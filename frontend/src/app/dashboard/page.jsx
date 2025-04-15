"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard";
import GalleryGrid from "@/components/gallery";
import * as Form from "@radix-ui/react-form";
import { CiImageOn } from "react-icons/ci";

const DashboardPage = () => {
  const [tab, setTab] = useState("view");

  return (
    <DashboardLayout>
      <div className="w-full  backgroudnh-full flex flex-col text-gray-500">
        <h1 className="font-bold text-gray-700">Painel administrador</h1>
        <span>Visualize, suba novas imagens ou delete imagens.</span>
        <div className="border-b border-black/10 my-5"></div>

        <div className="flex w-full h-full">
          <aside className="flex flex-col gap-4">
            <span
              onClick={() => setTab("view")}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 justify-start cursor-pointer hover:bg-black/10 hover:underline ${
                tab == "view" ? "bg-black/10" : ""
              }`}
            >
              Visualizar fotos
            </span>
            <span
              onClick={() => setTab("upload")}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 justify-start cursor-pointer hover:bg-black/10 hover:underline ${
                tab == "upload" ? "bg-black/10" : ""
              }`}
            >
              Subir nova foto
            </span>
          </aside>

          <div className="border-r h-full border-black/10 mx-5" />

          <div className="px-5  w-full">
            {tab === "view" && (
              <div>
                <h2 className="text-lg font-semibold">Visualização de fotos</h2>
                <p>Aqui você poderá navegar pelas fotos existentes.</p>
                <div className="border-b border-black/10 my-4 " />
                <GalleryGrid gridStyle="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]" />
              </div>
            )}
            {tab === "upload" && (
              <div>
                {" "}
                <h2 className="text-lg font-semibold mb-4">Subir nova foto</h2>
                <Form.Root className=" gap-4">
                  <Form.Field name="image">
                    <div className="flex flex-col gap-1">
                      <Form.Label className="text-sm font-medium">
                        Imagem
                      </Form.Label>
                      <Form.Control asChild>
                        <div>
                          <div className="flex items-center gap-2 mb-[31px] w-full">
                            <CiImageOn className="text-[40px]" />
                            <label
                              htmlFor="fileInput"
                              className="text-[#669DF6]
                              underline cursor-pointer"
                            >
                              Faça upload de um arquivo
                            </label>
                          </div>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </Form.Control>
                    </div>
                  </Form.Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                    {[
                      "collection",
                      "name",
                      "location",
                      "models",
                      "creativeDirection",
                      "photography",
                      "photographyAssistant",
                      "film",
                      "styling",
                      "beauty",
                      "setProduction",
                      "executiveProduction",
                    ].map((field) => (
                      <Form.Field key={field} name={field}>
                        <div className="flex flex-col gap-1">
                          <Form.Label className="text-sm font-medium capitalize">
                            {field}
                          </Form.Label>
                          <Form.Control asChild>
                            <input
                              type="text"
                              className="border border-black/20 shadow p-2 rounded bg-white"
                            />
                          </Form.Control>
                        </div>
                      </Form.Field>
                    ))}
                  </div>
                  <Form.Submit asChild>
                    <button
                      type="submit"
                      className="bg-black/30 text-black/70 font-medium w-full mt-20 px-4 py-2 rounded hover:bg-black/70 hover:text-white duration-300 transition-all cursor-pointer shadow drop-shadow"
                    >
                      Enviar imagem
                    </button>
                  </Form.Submit>
                </Form.Root>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
