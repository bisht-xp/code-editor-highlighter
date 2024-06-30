import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";
// import CodeEditor from "../../components/CodeEditor";

const Home = () => {
  return (
    <div className="container mx-auto p-4 h-screen w-full">
      <h1 className="text-2xl font-bold mb-4 md:mb-14 text-center">
        Code Editor
      </h1>
      <div className="flex flex-col w-full md:flex-row justify-center justify-items-center items-center gap-10 md:gap-5">
        <div className=" w-full  lg:w-[50%]">
          <div className="flex flex-col justify-center items-center gap-5">
            <h3 className="py-5 px-5">
              A simple code editor with syntax highlighting.
            </h3>
            <Link
              href={"https://github.com/bisht-xp/code-editor-highlighter"}
              target="_blank"
              className="py-3 px-5 bg-black rounded text-white font-bold"
            >
              Github Link
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[50%] overflow-auto">
          <CodeEditor
            padding={10}
            style={{
              fontSize: 14,
              minHeight: 500,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
