import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    window.location = "/Products";
  }, []);
  return <></>;
}
