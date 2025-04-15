"use client";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard";
import GalleryGrid from "@/components/gallery";
import * as Form from "@radix-ui/react-form";
import { CiImageOn } from "react-icons/ci";
import { uploadPhoto } from "@/lib/utils";
import api from "@/lib/api";

const DashboardPage = () => {
  const [tab, setTab] = useState("view");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const fields = [
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
  ];

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col text-gray-500">
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

          <div className="px-5 w-full">
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
                <h2 className="text-lg font-semibold mb-4">Subir nova foto</h2>

                <Form.Root
                  className="gap-4"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (!file) {
                      alert("Selecione uma imagem");
                      return;
                    }

                    const formData = new FormData(e.currentTarget);

                    const data = {
                      name: formData.get("name"),
                      collection: formData.get("collection"),
                      location: formData.get("location") || "",
                      models: formData.get("models") || "",
                      creativeDirection:
                        formData.get("creativeDirection") || "",
                      photography: formData.get("photography") || "",
                      photographyAssistant:
                        formData.get("photographyAssistant") || "",
                      film: formData.get("film") || "",
                      styling: formData.get("styling") || "",
                      beauty: formData.get("beauty") || "",
                      setProduction: formData.get("setProduction") || "",
                      executiveProduction:
                        formData.get("executiveProduction") || "",
                    };

                    try {
                      const photo = await uploadPhoto({ data, image: file });
                      alert("Imagem enviada com sucesso!");
                    } catch (err) {
                      alert(err.message);
                    }
                  }}
                >
                  {!previewUrl ? (
                    <Form.Field name="image" className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <Form.Label className="text-sm font-medium">
                          Imagem
                        </Form.Label>
                        <div className="flex items-center gap-2 mb-[31px] w-full">
                          <CiImageOn className="text-[40px]" />
                          <label
                            htmlFor="fileInput"
                            className="text-[#669DF6] underline cursor-pointer"
                          >
                            Faça upload de um arquivo
                          </label>
                        </div>
                        <Form.Control asChild>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0] ?? null;
                              setFile(selectedFile);

                              if (selectedFile) {
                                const preview =
                                  URL.createObjectURL(selectedFile);
                                setPreviewUrl(preview);
                              } else {
                                setPreviewUrl(null);
                              }
                            }}
                          />
                        </Form.Control>
                      </div>
                    </Form.Field>
                  ) : (
                    <div className="relative overflow-hidden h-[200px] w-[200px] my-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-xs border border-black/10 rounded shadow"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                          const input = document.getElementById("fileInput");
                          if (input) input.value = "";
                        }}
                        className="absolute top-1 right-1 bg-black/50 text-white px-2 py-1 text-xs rounded hover:bg-black"
                      >
                        Remover
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                    {fields.map((field) => (
                      <Form.Field key={field} name={field}>
                        <div className="flex flex-col gap-1">
                          <Form.Label className="text-sm font-medium capitalize">
                            {field}
                          </Form.Label>
                          <Form.Control asChild>
                            <input
                              type="text"
                              name={field}
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
