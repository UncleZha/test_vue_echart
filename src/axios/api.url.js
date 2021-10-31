let env = process.env.VUE_APP_ENV;
let api = {};

if (env == "local") {
  api.kuayu = "api/"; //测试
  //api.baseUrl = "https://pm.lizikaer.com/api"; //本地
  api.baseUrl = "https://betapm.lizikaer.com/api"; //测试
  //api.baseUrl = 'https://pmapi.lizikaer.com/api'; //生产
  //api.shareUrl = "https://sfa-dat.bohailife.net/bhjdt/wx/getSign"; //微信分享
  api.shareMyPage = "https://sfa-dat.bohailife.net/product/#/"; //分享地址
  api.authUrl =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7f7e7a01466a01&redirect_uri=REDIRECTURL&response_type=code&connect_redirect=1&scope=snsapi_userinfo#wechat_redirect";
  //api.shareUrl = "http://10.14.0.130:15505/bhjdt/wx/getSign"; //微信分享
  api.shareMyPage = "https://sqadmin.lizikaer.com/pm_test/"; //分享地址
} else if (env == "dev") {
  api.shareMyPage = "https://sqadmin.lizikaer.com/pm_test/#/planList"; //分享地址
  api.kuayu = "https://shangyounth.oss-cn-beijing.aliyuncs.com/";
  api.baseUrl = "https://betapm.lizikaer.com/api"; //
  api.authUrl =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7f7e7a01466a01&redirect_uri=REDIRECTURL&response_type=code&connect_redirect=1&scope=snsapi_userinfo#wechat_redirect";
} else if (env == "dat") {
} else if (env == "uat") {
} else if (env == "sta") {
} else if (env == "prd") {
  api.shareMyPage = "https://sqadmin.lizikaer.com/pm/#/planList"; //分享地址
  api.kuayu = "https://shangyounth.oss-cn-beijing.aliyuncs.com/";
  api.baseUrl = "https://pmapi.lizikaer.com/api"; //生产
  api.authUrl =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7f7e7a01466a01&redirect_uri=REDIRECTURL&response_type=code&connect_redirect=1&scope=snsapi_userinfo#wechat_redirect";
}

api.kuayu = "https://shangyounth.oss-cn-beijing.aliyuncs.com/";
api.baseUrl = process.env.VUE_APP_API_HOST + "/api";
api.shareMyPage = process.env.VUE_APP_SHARE_MYPAGE;
api.authUrl =
  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7f7e7a01466a01&redirect_uri=REDIRECTURL&response_type=code&connect_redirect=1&scope=snsapi_userinfo#wechat_redirect";

api.queryLog = api.baseUrl + "/v1/queryLog"; //日志打印
api.shareKey = api.baseUrl + "/v1/wechat/shareConfigParam"; //微信分享参数
api.login = api.baseUrl + "/v1/login"; //登录
api.clients = api.baseUrl + "/v1/clients"; //获取客户列表
api.lastClients = api.baseUrl + "/v1/clients/lists/last_contact"; //获取客户列表(最近沟通)
api.Stores = api.baseUrl + "/v1/stores"; //店铺post添加，get取
api.userInfo = api.baseUrl + "/v1/user/show"; //用户信息
api.index = api.baseUrl + "/v1/index"; //我的任务
api.leaves = api.baseUrl + "/v1/leaves"; //新增请假
api.userCenter = api.baseUrl + "/v1/user/index"; //用户中心
api.ossSign = api.baseUrl + "/v1/ossSign"; //获取密钥
api.communications = api.baseUrl + "/v1/client/communications"; //客户记录接口
api.tasks = api.baseUrl + "/v1/tasks"; //按时间段获取任务
api.communications = api.baseUrl + "/v1/client/communications"; //获取客户数据列表
api.fordate = api.baseUrl + "/v1/client/communications/fordate"; //获取指定日期数据
api.communicationsDetails = api.baseUrl + "/v1/client/communications/show/"; //客户详情
api.forclient = api.baseUrl + "/v1/client/communications/forclient";
api.comments = api.baseUrl + "/v1/comments"; //添加评论
api.goodsWay = api.baseUrl + "/v1/deals/goods"; //销售方案列表
api.deals = api.baseUrl + "/v1/deals/"; //成交记录
api.editDeals = api.baseUrl + "/v1/deals/detail/"; //成交记录
api.dealsfordate = api.baseUrl + "/v1/deals/fordate"; //根据日期获取成交记录
api.getTaskNameByMonthPlanId =
  api.baseUrl + "/v1/tasks/getTaskNameByMonthPlanId"; //获取邀约类型
api.invitesRecord = api.baseUrl + "/v1/invites"; //添加邀约记录
api.invites = api.baseUrl + "/v1/invites/"; //邀约信息
api.editInvites = api.baseUrl + "/v1/invites/detail/"; //修改时获取邀约信息
api.invitesfordate = api.baseUrl + "/v1/invites/fordate"; //邀约指定日期记录
api.clockInfo = api.baseUrl + "/v1/clockin"; //打卡记录
api.clockin = api.baseUrl + "/v1/clockin"; //发起打卡
api.unfinishedDay = api.baseUrl + "/v1/clockin/unfinished_logs"; //未打卡日期列表
api.clockinfordate = api.baseUrl + "/v1/clockin/fordate"; //获取指定日期打卡记录
api.communicationsforhistory =
  api.baseUrl + "/v1/client/communications/forhistory"; //历史沟通记录
api.dealsForhistory = api.baseUrl + "/v1/deals/forhistory"; //获取成交历史
api.lbstoaddr = api.baseUrl + "/v1/clockin/lbstoaddr"; //获取打卡位置
api.invitesforhistory = api.baseUrl + "/v1/invites/forhistory"; //历史邀约
api.allHistory = api.baseUrl + "/v1/clients/"; //获取全部历史记录
api.clientsDetail = api.baseUrl + "/v1/clients/detail/"; //获取客户数据
api.dealsShow = api.baseUrl + "/v1/deals/show/"; //成交记录详情
api.invitesShow = api.baseUrl + "/v1/invites/show/"; //邀请记录详情
api.new_resources = api.baseUrl + "/v1/new_resources/"; //添加新资源
api.editResources = api.baseUrl + "/v1/new_resources/detail/"; //添加新资源修改时获取新资源任务详情
api.new_resourcesforhistory = api.baseUrl + "/v1/new_resources/forhistory"; //获取历史资源列表
api.new_resourcesfordate = api.baseUrl + "/v1/new_resources/fordate"; //获取指定记录
api.new_resourcesshow = api.baseUrl + "/v1/new_resources/show/"; //查看新资源记录
api.summarys = api.baseUrl + "/v1/summarys/"; //添加总结会
api.editSummarys = api.baseUrl + "/v1/summarys/detail/"; //修改总结会详情
api.summarysFordate = api.baseUrl + "/v1/summarys/fordate"; //总结会按日期
api.summarysforhistory = api.baseUrl + "/v1/summarys/forhistory"; //总结会历史记录
api.summarysshow = api.baseUrl + "/v1/summarys/show/"; //总结会详情
api.storechecks = api.baseUrl + "/v1/storechecks"; //巡店记录
api.storechecksforhistory = api.baseUrl + "/v1/storechecks/forhistory"; //巡店历史
api.storechecksfordate = api.baseUrl + "/v1/storechecks/fordate"; //按日期查询
api.storechecksshow = api.baseUrl + "/v1/storechecks/show/";
api.key_clientCommunications = api.baseUrl + "/v1/key_client/communications/"; //大客户记录添加
api.editKey_clientCommunications =
  api.baseUrl + "/v1/key_client/communications/detail/"; //修改大客户获取记录
api.key_clientFordate = api.baseUrl + "/v1/key_client/communications/fordate";
api.key_clientforhistory =
  api.baseUrl + "/v1/key_client/communications/forhistory";
api.key_clientshow = api.baseUrl + "/v1/key_client/communications/show/";
api.instore_service = api.baseUrl + "/v1/instore_services/"; //巡店记录
api.editInstore_service = api.baseUrl + "/v1/instore_services/detail/"; //修改时获取巡店记录
api.instore_serviceforhistory = api.baseUrl + "/v1/instore_services/forhistory";
api.instore_servicefordate = api.baseUrl + "/v1/instore_services/fordate";
api.instore_serviceshow = api.baseUrl + "/v1/instore_services/show/";
api.storesDetail = api.baseUrl + "/v1/stores/"; //店铺详情
api.storesOnlyDetail = api.baseUrl + "/v1/stores/detail/"; //只有店铺详情
api.month_plans = api.baseUrl + "/v1/tasks/month_plans"; //获取指定日期任务
api.notices = api.baseUrl + "/v1/notices"; //消息列表
api.noticesReaded = api.baseUrl + "/v1/notices/readed"; //消息标记已读
api.todo_lists = api.baseUrl + "/v1/todo_lists"; //添加待办
api.meetingJoins = api.baseUrl + "/v1/meeting_joins/"; //大区总添加参会任务
api.editMeetingJoins = api.baseUrl + "/v1/meeting_joins/detail/"; //修改大区总参会获取任务详情
api.meetingJoinsFordate = api.baseUrl + "/v1/meeting_joins/fordate"; //总结会按日期
api.meetingJoinsShow = api.baseUrl + "/v1/meeting_joins/show/"; //总结会详情
api.next_plans = api.baseUrl + "/v1/next_plans/"; //明日计划
api.editNext_plans = api.baseUrl + "/v1/next_plans/detail/"; //明日计划修改时获取任务详情
api.next_plansFordate = api.baseUrl + "/v1/next_plans/fordate"; //明日计划按日查询
api.next_plansDetails = api.baseUrl + "/v1/next_plans/show/"; //明日计划详情
api.idcardOCR = api.baseUrl + "/v1/idcardOCR"; //身份证识别
api.today_goals = api.baseUrl + "/v1/today_goals/"; //今日收款目标
api.editToday_goals = api.baseUrl + "/v1/today_goals/detail/"; //修改今日收款目标
api.today_goalsFordate = api.baseUrl + "/v1/today_goals/fordate"; //今日收款目标按日查询
api.today_goalsDetails = api.baseUrl + "/v1/today_goals/show/"; //今日收款目标详情
api.client_analysis = api.baseUrl + "/v1/client_analysis"; //顾客深度分析表
api.client_analysisDetail = api.baseUrl + "/v1/client_analysis/detail"; //获取分析表详细数据

api.editCustomerInfo = api.baseUrl + "/v1/client/communications/detail/"; //添加顾客修改时获取沟通客户任务详情
api.submitCustomerInfo = api.baseUrl + "/v1/client/communications/"; //修改沟通客户记录
api.task_records = api.baseUrl + "/v1/clients/task_records/"; //客户详情
api.questionSurvey = api.baseUrl + "/v1/survey"; //问卷列表
api.get_form = api.baseUrl + "/v1/survey/get_form"; //同过身份证走问卷
api.show_order_detail = api.baseUrl + "/v1/clients/show/show_order_detail"; //用户订单信息
api.month_plans_all = api.baseUrl + "/v1/tasks/month_plans_all";
api.card_id_create = api.baseUrl + "/v1/survey/card_id_create"; //创建身份证
api.pass_checks = api.baseUrl + "/v1/pass_checks/"; //添加通关考核
api.pass_checksAll = api.baseUrl + "/v1/pass_checks"; //通关考核任务列表
api.pass_checksfordate = api.baseUrl + "/v1/pass_checks/fordate"; //指定当日的考核任务
api.pass_checksDetail = api.baseUrl + "/v1/pass_checks/show/"; //通关考核详情
api.editpass_checks = api.baseUrl + "/v1/pass_checks/detail/"; //修改通关考核数据

//审核相关

api.audit_lists = api.baseUrl + "/v1/review/lists"; //审核列表
api.recoder_count = api.baseUrl + "/v1/review/recoder_count"; //获取审核记录总数
api.ClockDate = api.baseUrl + "/v1/review/clockin"; //审核-打卡统计
api.levelTree = api.baseUrl + "/v1/review/leader_nodes"; //我的下级
api.reviewIndex = api.baseUrl + "/v1/review/index";
api.reviewCommunications = api.baseUrl + "/v1/review/client/communications"; //审核-客户记录接口
api.reviewTasks = api.baseUrl + "/v1/review/tasks"; //审核-按时间段获取任务
api.reviewFordate = api.baseUrl + "/v1/review/client/communications/fordate"; //获取指定日期数据
api.reviewDeals = api.baseUrl + "/v1/review/deals"; //成交记录
api.reviewDealsfordate = api.baseUrl + "/v1/review/deals/fordate"; //根据日期获取成交记录
api.reviewInstore_service = api.baseUrl + "/v1/review/instore_services"; //驻店记录
api.reviewInstore_servicefordate =
  api.baseUrl + "/v1/review/instore_services/fordate"; //驻店记录-按日期查询
api.reviewInvites = api.baseUrl + "/v1/review/invites"; //邀约信息
api.reviewInvitesfordate = api.baseUrl + "/v1/review/invites/fordate"; //邀约指定日期记录
api.reviewNew_resources = api.baseUrl + "/v1/review/new_resources"; //添加新资源
api.reviewNew_resourcesfordate =
  api.baseUrl + "/v1/review/new_resources/fordate"; //获取指定记录
api.reviewDealsfordate = api.baseUrl + "/v1/review/deals/fordate"; //根据日期获取成交记录
api.reviewKey_clientCommunications =
  api.baseUrl + "/v1/review/key_client/communications"; //大客户记录添加
api.reviewKey_clientFordate =
  api.baseUrl + "/v1/review/key_client/communications/fordate"; //大客户按日期获取
api.reviewSummarysFordate = api.baseUrl + "/v1/review/summarys/fordate"; //总结会按日期
api.reviewSummarys = api.baseUrl + "/v1/review/summarys"; //添加总结会
api.reviewStorechecks = api.baseUrl + "/v1/review/storechecks"; //巡店记录
api.reviewStorechecksfordate = api.baseUrl + "/v1/review/storechecks/fordate"; //巡店记录-按日期查询
api.recoderCheck = api.baseUrl + "/v1/review/recoder_check"; //提交审核任务记录
api.reviewMeetingJoins = api.baseUrl + "/v1/review/meeting_joins"; //大区总添加参会任务
api.reviewMeetingJoinsFordate =
  api.baseUrl + "/v1/review/meeting_joins/fordate"; //总结会按日期
api.reviewPassChecksDetail = api.baseUrl + "/v1/review/pass_checks/show/"; //通关考核详情

//审核详情页
api.reviewCommunicationsDetails =
  api.baseUrl + "/v1/review/client/communications/show/"; //客户详情
api.reviewDealsShow = api.baseUrl + "/v1/review/deals/show/"; //成交记录详情
api.reviewInvitesShow = api.baseUrl + "/v1/review/invites/show/"; //邀请记录详情
api.reviewSummarysshow = api.baseUrl + "/v1/review/summarys/show/"; //总结会详情
api.reviewStorechecksshow = api.baseUrl + "/v1/review/storechecks/show/";
api.reviewKey_clientshow =
  api.baseUrl + "/v1/review/key_client/communications/show/";
api.reviewInstore_serviceshow =
  api.baseUrl + "/v1/review/instore_services/show/";
api.reviewNew_resourcesshow = api.baseUrl + "/v1/review/new_resources/show/"; //查看新资源记录
api.reviewMeetingJoinsShow = api.baseUrl + "/v1/review/meeting_joins/show/"; //总结会详情
api.reviewNext_plansDetails = api.baseUrl + "/v1/review/next_plans/show/"; //明日计划详情
api.reviewToday_goalsDetails = api.baseUrl + "/v1/review/today_goals/show/"; //今日收款目标详情

//待办
api.todo_lists = api.baseUrl + "/v1/todo_lists"; //添加待办
api.todo_listsDone = api.baseUrl + "/v1/todo_lists/done"; //提交完成待办
api.todo_listsDetail = api.baseUrl + "/v1/todo_lists/"; //代办详情
api.deltodo_lists = api.baseUrl + "/v1/todo_lists"; // 删除待办

//图表相关
//api.baseUrl='/api';
api.chart_today_goal_by_date = api.baseUrl + "/v1/moneyByDate";
api.chart_today_goal_by_member = api.baseUrl + "/v1/moneyByMember";
api.chart_new_resource_by_sub_pid = api.baseUrl + "/v1/newStoreNumBySubPid";
api.chart_new_resource_by_top_pid = api.baseUrl + "/v1/newStoreNumByTopPid";

//考核日报
api.report_daily = api.baseUrl + "/v1/report/daily";
api.report_daily_logs = api.baseUrl + "/v1/report/daily_logs";
api.report_tasks = api.baseUrl + "/v1/report/tasks";

//公海店铺列表
api.publicStores = api.baseUrl + "/v1/public_stores";
api.follow_log = api.baseUrl + "/v1/public_stores/follow_log";
api.storesDelay = api.baseUrl + "/v1/public_stores/delay/"; //延期申请
api.storeRelease = api.baseUrl + "/v1/public_stores/release/"; //释放店铺
api.myStore = api.baseUrl + "/v1/public_stores/my"; //抢到的店铺

api.seachFile = api.baseUrl + "/v1/docs";

api.get_work_contents = api.baseUrl + "/v1/work_contents"; //工作内容选项
api.get_work_status = api.baseUrl + "/v1/work_status"; //工作状态选项

// 审核打卡详情
api.reviewClockinDetails = api.baseUrl + "/v1/review/clockin/daily_logs/";
api.ClockinDetails = api.baseUrl + "/v1/clockin/daily_logs/"; //打卡汇总详情

//新版4*5接口
api.newShops = api.baseUrl + "/v1/shops"; //店铺列表
api.customers = api.baseUrl + "/v1/customers"; //顾客列表
//新版4*5
api.CustomerGetRate = api.baseUrl + "/v1/customers/getRate/";
api.CustomerAddrate = api.baseUrl + "/v1/customers/addRate";
api.refer_data = api.baseUrl + "/v1/refer_data";
api.todo_plans = api.baseUrl + "/v1/todo_plans"; //添加待办
api.tasksList = api.baseUrl + "/v1/todo_plans/tasks"; //动作列表
api.todo_plansDetail = api.baseUrl + "/v1/todo_plans/detail/"; //计划详情
api.connect_end = api.baseUrl + "/v1/todo_plans/connect_end"; //结束跟进
api.cooper_reply = api.baseUrl + "/v1/todo_plans/cooper_reply/"; //领导回复
api.delay = api.baseUrl + "/v1/todo_plans/delay"; //申请延期
api.v2reviewLists = api.baseUrl + "/v2/review/lists"; //审核列表
api.v2recoder_count = api.baseUrl + "/v2/review/recoder_count"; //审核总数
api.v2reviewindex = api.baseUrl + "/v2/review/index"; //指定用户日期清单
api.v2todo_plans = api.baseUrl + "/v2/review/todo_plans/detail/";
api.v2recoder_check = api.baseUrl + "/v2/review/recoder_check"; //提交审核
api.customersDetail = api.baseUrl + "/v1/customers/detail/"; //获取顾客信息
api.changeCustomers = api.baseUrl + "/v1/customers/"; //修改顾客信息
api.todo_chains = api.baseUrl + "/v1/todo_chains/"; //链路详情信息
api.overview = api.baseUrl + "/v1/todo_plans/overview"; //计划总览
api.todo_plansRecent = api.baseUrl + "/v1/todo_plans/recent"; //近30日计划
api.v2useIndex = api.baseUrl + "/v2/user/index"; //新版个人中心
api.v2analysisDetail = api.baseUrl + "/v2/customer_analysis/detail"; //新版分析表数据
api.v2Customer_analysis = api.baseUrl + "/v2/customer_analysis"; //添加新版分析
api.v2show_order_detail = api.baseUrl + "/v1/customers/show/show_order_detail"; //新版消费明细
api.base_info = api.baseUrl + "/v2/customers/base_info/"; //基本资料
api.v2survey = api.baseUrl + '/v2/survey';//问卷列表
api.v2card_id_create = api.baseUrl + '/v2/survey/card_id_create';//创建身份证号
api.v2get_form = api.baseUrl + '/v2/survey/get_form';//根据身份证获取表单
api.savebase_info = api.baseUrl + '/v2/customer_analysis/base_info';//保存顾客信息
export default api;
