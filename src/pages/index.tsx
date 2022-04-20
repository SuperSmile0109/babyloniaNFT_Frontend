import MainPage from "@components/MainPage";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import html from "remark-html";
import MobileDetect from "mobile-detect";
import useAppState, { ACTIONS } from "src/hooks/useAppState";
import { remark } from "remark";
import { useEffect } from "react";
import Marketplace from "./Marketplace";

type TProps = {
  isMobile: boolean;
  logs: string;
};

const Home: NextPage<TProps> = ({ isMobile, logs }) => {

  const { dispatch } = useAppState()

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_LOGS,
      payload: logs,
    })
  }, [logs, dispatch])

  return <Marketplace />;
};

export async function getServerSideProps({ req }: NextPageContext) {
  const md = new MobileDetect(req?.headers['user-agent'] ?? '')
  const logs = await (await fetch('https://raw.githubusercontent.com/babyloniaapp/docs/main/logs.md')).text()
  const markdown = await remark()
    .use(html)
    .process(logs || '')
  const content = markdown.toString()

  return {
    props: {
      isMobile: Boolean(md.mobile()),
      logs: content,
    },
  }
}

export default Home;
