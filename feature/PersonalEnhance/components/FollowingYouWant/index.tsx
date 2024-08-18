import React from "react"
import MyLoadingSvg from "react:../loading.svg";
import useShowUserInfo from "./useShowUserInfo";


const FollowingYouWant = ({ followYouMayWantParams }) => {
    const { dataSource = [], loading } = followYouMayWantParams
    const { showUserInfo, setShowUserInfo,
        PersionInfoDom } = useShowUserInfo()

    return (
        <div className="p-6" onMouseLeave={() => {
            setShowUserInfo({
                userInfo: null
            })
        }}>
            {loading && (
                <div className="flex w-full h-[100px] justify-center items-center">
                    <MyLoadingSvg className="animate-spin"></MyLoadingSvg>
                </div>
            )}
            {!loading && dataSource?.length > 0 && <div className="flex gap-[18px] flex-wrap justify-between"
            >
                {
                    dataSource.map((item, index) => {
                        return (
                            <div key={item.user_id + '--' + index}
                                className=" relative"
                            >
                                <div className="cursor-pointer flex flex-col justify-center items-center" onClick={() => {
                                    window.open(location.origin + "/" + item.screen_name, "_blank");

                                }}
                                    onMouseEnter={() => {
                                        setShowUserInfo({
                                            userInfo: item
                                        })
                                    }}

                                >
                                    <img
                                        src={item.profile_image_url_https || item.profile_image_url}
                                        className="border_theme w-[40px] h-[40px] rounded-full flex-none"
                                        key={item.id + 'image'}
                                    ></img>
                                    <div className="text-white text-center">{index}</div>
                                </div>
                                {item.user_id + '-' + index === showUserInfo.userInfo?.user_id + '-' + index&& <div key={item.user_id + '--item--' + index}><PersionInfoDom></PersionInfoDom></div>}
                            </div>
                        )
                    })
                }

            </div>}
            {!loading && dataSource?.length === 0 && (
                <div className="text-center font-extrabold text_theme_text text-[31px]">
                    no data， try again later
                </div>
            )}
        </div>
    )
}

export default FollowingYouWant