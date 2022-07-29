import React from "react";
import { connect } from "react-redux";
import { eventConstants } from "../../constants";

/*.........Toast used to show success or failure of any event..............*/

function CommonSuccessToastDialog(props) {
  const { toast } = props;
  const { type, message } = toast;
  React.useEffect(() => {
    setTimeout(() => {
      return props.dispatch({ type: eventConstants.SUCCESSTOAST, data: {} });
    }, 5000);
  }, []);
  return (
    <div className="fixed flex w-full top-0 left-0 right-0 bottom-0 zIndex999999999999999999999999 flex-flow-col">
      <div className="w-125 h-16 items-center bg-white border27-px-profile p-5 mx-auto mt-28.5">
        <div className="flex">
          {type === "success" ? (
            <img src="/images/success.svg" />
          ) : (
            <img src="/images/cross.svg" />
          )}
          <div className="text-ft5 text-darkGrey-50 font-PoppinsRegular ml-3.5 margin-top-3-px">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = ({ user }) => {
  return { toast: user.successToast };
};
export default connect(mapStateToProps)(CommonSuccessToastDialog);
