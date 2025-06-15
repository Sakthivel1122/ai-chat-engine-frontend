import React from 'react'
import styles from "./loader.module.scss";
import { FaSpinner } from 'react-icons/fa';
import { LuLoader } from "react-icons/lu";
import { RiLoaderLine } from "react-icons/ri";
import { RiLoaderFill } from "react-icons/ri";

interface LoaderProps {
  size?: number;
}

const Loader:React.FC<LoaderProps> = ({size = 18}) => {
  return (
    <RiLoaderFill className={styles.Loader} size={size}/>
  )
}

export default Loader;
