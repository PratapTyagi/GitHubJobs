import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ReactMarkdown from "react-markdown";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: 275,
    backgroundColor: "#eeeedd",
    marginBottom: 15,
    marginLeft: "2%",
    marginRight: "2%"
  },
  title: {
    fontSize: 14,
    fontWeight: "lighter"
  },
  pos: {
    marginBottom: 10
  },
  shape: {
    backgroundColor: "#bdbdbd",
    color: "white",
    height: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  margin: {
    backgroundColor: "#bdbdbd",
    color: "white",
    height: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10
  },
  link: {
    color: "#29b6f6",
    cursor: "pointer",
    wordBreak: "break-all"
  }
});

export default function Job({ job }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {job.title}- <span className={classes.title}>{job.company}</span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(job.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          <Badge className={classes.shape && classes.margin}>{job.type}</Badge>
          <Badge className={classes.shape}>{job.location}</Badge>
        </Typography>
        <div className={classes.link}>
          <ReactMarkdown source={job.how_to_apply} />
        </div>
        <Button variant="contained" color="primary" onClick={handleChange}>
          {checked ? "Hide Details" : "View Details"}
        </Button>
        <Collapse in={checked}>
          <ReactMarkdown source={job.description} />
        </Collapse>
      </CardContent>
      <img src={job.company_logo} alt={job.company} height="50" />
    </Card>
  );
}
