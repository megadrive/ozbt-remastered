import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions, AuthSessionProps } from "../api/auth/[...nextauth]";
import SignOutButton from "../components/SignOutButton";

type DashboardIndexProps = {} & AuthSessionProps;

const DashboardIndex: NextPage<DashboardIndexProps> = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
      Dashboard <SignOutButton />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  DashboardIndexProps
> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default DashboardIndex;
