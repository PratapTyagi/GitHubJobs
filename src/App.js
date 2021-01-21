import React, { useState } from "react";
import UseFetchJobs from "./components/useFetchJobs";
import Container from "@material-ui/core/Container";
import Job from "./components/Job";
import { createMuiTheme } from "@material-ui/core/styles";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = UseFetchJobs(params, page);

  const theme = createMuiTheme();
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center" }}>LATEST JOBS</h1>
      {loading && <h1>LOADING...</h1>}
      {error && <h1>ERROR!! TRY REFRESHING !!</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
