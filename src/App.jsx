// material ui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Cloud from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// end of material ui

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";

import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherApiSlice";
function App() {
  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });
  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("en");
  const direction = locale == "en" ? "ltr" : "rtl";

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDateAndTime(moment().format("dddd D MMMM YYYY, h:mm a "));
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  //========== event handlers
  function handleLangClick() {
    if (locale == "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("dddd D MMMM YYYY, h:mm a "));
  }

  return (
    <>
      <Container
        maxWidth="sm"
        className="bg-gradient-to-b h-full from-blue-100 via-blue-300 to-blue-400"
      >
        {/* content container */}
        <div className="h-screen flex flex-col justify-center items-center">
          {/* card */}
          <div
            className="w-full rounded-lg bg-blue-400 p-2 animate-fade-in"
            dir={direction}
          >
            {/* content */}
            <div>
              {/* city and time */}
              <div className="flex justify-end items-center gap-5 mb-2 text-white">
                <Typography variant="h5" gutterBottom sx={{ fontSize: "20px" }}>
                  {dateAndTime}
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  className="font-title "
                  dir="rtl"
                >
                  {t("cairo")}
                </Typography>
              </div>
              {/*== city and time ==*/}
              <hr className="text-white" />

              {/*degree and description */}
              <div className="pt-2 flex justify-around items-center ">
                <div sx={{ fontSize: "20px" }}>
                  <Cloud sx={{ fontSize: "80px", color: "white" }}></Cloud>
                </div>
                {/* temp */}
                <div className="text-white">
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    ""
                  )}

                  <Typography
                    variant="h4"
                    gutterBottom
                    className="text-center "
                    sx={{ fontSize: "20px" }}
                  >
                    {temp.number} ْc
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {temp.description}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <h5 className="text-center">
                      {t("min")} : {temp.min}
                    </h5>
                    <h5 className="text-center text-white  p-2"> | </h5>
                    <h5 className="text-center">
                      {t("max")} : {temp.max}
                    </h5>
                  </div>
                </div>
                {/*== temp ==*/}
              </div>
              {/* == degree and description == */}
            </div>
            {/*== content ==*/}
          </div>
          {/*== card == */}
          <div className="w-full flex justify-start">
            <Button
              variant="text"
              className="text-white"
              onClick={handleLangClick}
            >
              {locale === "en" ? "العربية" : "english"}
            </Button>
          </div>
        </div>

        {/*== content container == */}
      </Container>
    </>
  );
}

export default App;
