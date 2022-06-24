import Button from "@mui/material/Button";

function RedButton(props) {
  return (
    <Button color="red" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function BlueButton(props) {
  return (
    <Button color="blue" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function GreenButton(props) {
  return (
    <Button color="green" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function PurpleButton(props) {
  return (
    <Button color="secondary" variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export { RedButton, BlueButton, GreenButton, PurpleButton };
