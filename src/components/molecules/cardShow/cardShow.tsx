import { FC, useEffect, useState } from "react";
import { useShow } from "../../../hooks/useShow";
import { Show } from "../../../model";
import "./cardShow.css";

export const CardShow: FC<{ id: number }> = ({ id }) => {
  const { getShow } = useShow();

  const [show, setShow] = useState<Show>();

  useEffect(() => {
    const fn = async () => {
      const res = await getShow(id);
      setShow(res);
    };
    fn();
  }, []);

  return (
    show && (
      <div className="card-show">
        <div>Name: {show.name}</div>
        <div>Genres: {show.genres.map((g) => `${g} `)}</div>
        <div>Rating : {show.rating.average}</div>
        <div>Type: {show.type}</div>
      </div>
    )
  );
};
