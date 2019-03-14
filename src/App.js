import React, { useState, useEffect } from "react";

const initialXY = {
  x: null,
  y: null
};

const initialProfile = {
  url: null,
  follower: null,
  public_repos: null
};

export default function App() {
  const [count, setCount] = useState(1);
  const [update, setUpdate] = useState(false);
  const [xy, setXY] = useState(initialXY);

  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);

  const handleMouseMove = event => {
    setXY({
      x: event.pageX,
      y: event.pageY
    });
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.github.com/users/techsithgit");
      const json = await response.json();

      setLoading(false);
      if (json && json.url) {
        setProfile({
          url: json.url,
          followers: json.followers,
          public_repos: json.public_repos
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = count;
    window.addEventListener("mousemove", handleMouseMove);

    getProfile();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [update]);

  useEffect(() => {
      getProfile();
  },[]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        Up
      </button>
      <div>{update}</div>
      <button onClick={() => setUpdate(previouseUpdate => !previouseUpdate)}>
        Update
      </button>

      <div>{`x:${xy.x}, y:${xy.y}`}</div>
      <div>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <ul>
            <li>url: {profile.url}</li>
            <li>follower: {profile.followers}</li>
            <li>Repo:{profile.public_repos}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
