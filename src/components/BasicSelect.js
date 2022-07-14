import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert, Button } from "@mui/material";

export const BasicSelect = ({ carData }) => {
  const [carType, setCarType] = React.useState("");
  const [carSub, setCarSub] = React.useState("");
  const [carS2, setCarS2] = React.useState(null);
  const [car, setCar] = React.useState({
    name: "",
    show: false,
  });
  const carTypes = Object.keys(carData);

  const handleChange = (event) => {
    setCarType(event.target.value);
    let tempCarSub = carData[event.target.value];
    let tempCarSubBrand = new Set();
    let tempCarSubMake = new Set();
    let tempCarSubModel = new Set();
    tempCarSub.forEach((element) => {
      tempCarSubBrand.add(element.brand);
      tempCarSubMake.add(element.make);
      tempCarSubModel.add(element.model);
    });
    setCarSub({
      brand: tempCarSubBrand,
      make: tempCarSubMake,
      model: tempCarSubModel,
    });
    setCarS2("");
    setCar({
      name: "",
      show: false,
    });
  };

  const handleSubChange = (event) => {
    setCarS2({ ...carS2, [event.target.name]: event.target.value });
    setCar({
      name: "",
      show: false,
    });
  };

  const fetchCar = () => {
    for (let eleObj of carData[carType]) {
      let intersection = Object.values(eleObj).filter((value) =>
        Object.values(carS2).includes(value)
      );
      if (intersection.toString() == Object.values(carS2).toString()) {
        setCar({
          show: true,
          name: eleObj.name,
        });
        return;
      } else {
        setCar({
          show: true,
          severity: "error",
          name: "Dream Car",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCar();
  };

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        padding: "5%",
        marginTop: "10%",
        marginBottom: "20%",
        backgroundColor: "#7dffc54d",
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <InputLabel id="demo-simple-select-label">Car Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carType}
            label="Car Type"
            onChange={handleChange}
            required
          >
            {carTypes.map((ele, ind) => {
              return (
                <MenuItem key={ind} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div>
          {carSub &&
            Object.entries(carSub).map(([key, value]) => {
              return (
                <FormControl key={key} margin="normal" fullWidth>
                  <InputLabel id="demo-simple-select-label">{key}</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={carS2[key] ?? " "}
                    label={key}
                    onChange={handleSubChange}
                    name={key}
                    required
                  >
                    {Array.from(value).map((ele, ind) => {
                      return (
                        <MenuItem key={ind} value={ele || " "}>
                          {ele}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            })}
        </div>
        <FormControl fullWidth>
          <Button variant={"contained"} type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
      {car.show && (
        <Alert variant="filled" severity={car.severity || "info"}>
          Your car: {car?.name}
        </Alert>
      )}
    </Box>
  );
};
