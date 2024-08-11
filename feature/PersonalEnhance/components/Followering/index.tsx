import React from "react";
import CommonList from "../CommonList";
import { useFolloweringApiHooks } from "../../hooks/useFolloweringApiHooks";
import MyTabs, { TabPane, TabTitle } from "~components/MyTabs";
import RecentFollowing from "../RecentFollowing";
import FollowingYouWant from '../FollowingYouWant'

export default ({ followeringParams, recentFollowingParams , followYouMayWantParams}) => {
  const { filters, dataSource, setParams, loading, setPageNo } =
    followeringParams;

  return (
    <div className="w-full">
    <MyTabs>
      <TabTitle>Recent Following</TabTitle>
      <TabPane>
         <RecentFollowing recentFollowingParams={recentFollowingParams}></RecentFollowing>
      </TabPane>
      <TabTitle>All Following</TabTitle>
      <TabPane>
      <CommonList
        setPageNo={setPageNo}
        filters={filters}
        dataSource={dataSource}
        setParams={setParams}
        loading={loading}
      ></CommonList>
      </TabPane>
      <TabTitle>Following you may want</TabTitle>
      <TabPane>
        <FollowingYouWant followYouMayWantParams={followYouMayWantParams}></FollowingYouWant>
      </TabPane>
    </MyTabs>
    </div>
  );
};
