import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return <div className="flex justify-center items-center py-6">
  <TailSpin
  visible={true}
  height="100vh"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
/>
</div>
}
