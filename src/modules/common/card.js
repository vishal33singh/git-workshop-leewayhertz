import React from "react";

export default function Card({ title, value, image, color, eventDetail }) {
  return (
    <div className="bg-white min-w-72.5 w-full h-40 rounded-lg py-11.25 px-5 ">
      <div className="flex gap-7.5">
        <div className="rounded-full bg-blue-50 w-17.5 h-17.5 flex">
          {image ? (
            <img
              className="margin-auto"
              src={image}
              alt={image ? image : "card"}
            />
          ) : (
            ""
          )}
        </div>
        { title === "Tx Hash" ?
            (
              <div>
                <div className="flex">
                  <p className="mr-2 text-black-50">Tx Hash :</p>
                  <a href={eventDetail.network === "Baobab" ? `https://baobab.klaytnfinder.io/tx/${eventDetail.transactionHash}` : `https://www.klaytnfinder.io/tx/${eventDetail.transactionHash}`}
                     target="_blank" className="w-30 truncate text-blue-50">{eventDetail.transactionHash ? eventDetail.transactionHash : "N/A"}</a>
                </div>
                <div className="flex mt-3">
                  <p className="mr-2 text-black-50">Contract Address :</p>
                  <a href={eventDetail.network === "Baobab" ? `https://baobab.klaytnfinder.io/account/${eventDetail.contractAddress}` : `https://www.klaytnfinder.io/account/${eventDetail.contractAddress}`}
                     target="_blank" className="w-30 truncate text-blue-50">{eventDetail.contractAddress ? eventDetail.contractAddress : "N/A"}</a>
                </div>
              </div>
            ) :
            (<>
              <div>
                <h1 className="text-ft6 text-black-50 font-OpenSansRegular">
                  {title}
                </h1>
                <p
                    className={`mt-1 text-ft9  font-OpenSansSemiBold ${
                        color ? color : "text-black-50"
                    } `}
                >
                  {value}
                </p>
              </div>
            </>)
        }
      </div>
    </div>
  );
}
