import { useEffect, useState } from "react";
import { useAuth } from "../stores/authContext";
import styles from "../styles/Guides.module.css";

interface Guides {
  title: string;
  author: string;
}

export default function Guides() {
  const { user, authReady } = useAuth();
  const [guides, setGuides] = useState<Guides[]>([]);
  const [error, setError] = useState(null);

  console.log("##TOKEN: ", user?.token.access_token);

  useEffect(() => {
    console.log("boolean: ", authReady);
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: { Authorization: `Bearer ${user.token.access_token}` },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw Error("You must be logged in to this content");
          }
          return response.json();
        })
        .then((data) => {
          console.log("##Data: ", data);
          setGuides(data);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  console.log("###result: ", guides);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              laboriosam, tempore molestias eveniet fuga voluptatum dolorum
              voluptatem ducimus suscipit voluptas vitae similique quisquam
              illum consequatur non in unde. Labore, sunt?
            </p>
          </div>
        ))}
    </div>
  );
}
