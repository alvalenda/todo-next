import UserCreateForm from "@/components/forms/user-create-form";
import { FC } from "react";

interface PageProps {}

const Create: FC<PageProps> = () => {
  return (
    <section className="w-full md:w-4/5 h-full flex flex-col items-center justify-center">
      <UserCreateForm />
    </section>
  );
};

export default Create;
