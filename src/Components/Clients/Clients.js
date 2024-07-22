import Styles from "./Clients.module.css";

const Clients = ({ data }) => {
  // console.log(data);
  return (
    <section className={Styles.logos}>
      {!data ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "700",
            }}
          >
            Loading ...
          </p>
        </div>
      ) : (
        <div className={Styles.logoSlide}>
          {data.map((item, index) => {
            return (
              <span className={Styles.span} key={index}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_PATH}${item.image}`}
                  alt={item.name}
                  className={Styles.img}
                />
                <p>{item.name}</p>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Clients;
