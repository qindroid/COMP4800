import React from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Row,
  Col,
  Popconfirm,
  Table,
  message,
  Button,
  Input,
} from "antd";
import axios from "axios";
import utils from "../../common/Utils";
import { UserAddOutlined, EditOutlined } from "@ant-design/icons";
import store from "../../store";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class CashFlow extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.onTableTitle = this.onTableTitle.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onAddSupplier = this.onAddSupplier.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.handleDel = this.handleDel.bind(this);

    this.state = {
      dataSource: [],
      count: 0,
      limit: 20,
      bSearchMode: false,
      // user List
      columns: [
        {
          title: "ID",
          dataIndex: "cashFlowId",
          key: "cashFlowId",
          width: 80,
        },
        {
          title: "Cashflow Type",
          dataIndex: "type",
          key: "type",
        },
        // {
        //   title: "Created",
        //   dataIndex: "created",
        //   key: "created",
        // },
        {
          title: "Amount in CAD",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Project Type (Industry)",
          dataIndex: "projectType",
          key: "projecttype",
        },
        {
          title: "Company",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "",
          key: "operation",
          fixed: "right",
          width: 150,
          render: (text, record) => (
            <Space>
              {/* Link to edit user page */}
              {/* <Link to={"/main/CashFlow/edit/" + record.id}>
                    <Button type="primary" size="small" icon={<EditOutlined />}>
                      Edit
                    </Button>
                  </Link> */}

              <Popconfirm
                placement="right"
                title="Are you sure to delete this user?"
                onConfirm={() => this.handleDel(record.cashFlowId)}
              >
                {/* Delete user */}
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ],
    };
  }

  setLoading(bLoading) {
    let action = {
      type: "setLoading",
      value: bLoading,
    };

    store.dispatch(action);
  }

  onPageChange(page, size) {
    if (this.state.bSearchMode) {
      return;
    }
    this.loadPage(page, size);
  }

  onShowSizeChange(page, size) {
    this.setState({
      limit: size,
    });

    if (this.state.bSearchMode) {
      return;
    }

    this.loadPage(page, size);
  }

  onAddSupplier() {
    this.props.history.push("/main/cashflow/add");
  }

  handleDel(id) {
    this.setLoading(true);

    let self = this;
    const { cookies } = self.props;
    // Delete user API
    console.log(id);
    axios({
      method: "DELETE",
      url: utils.getDomain() + "api/cashFlow/delete?id=" + id,
      // headers: { token: cookies.get("token") },
    })
      .then(function (res) {
        console.log(res.data);
        self.setLoading(false);
        self.reloadPage(1, self.state.limit);
      })
      .catch(function (err) {
        message.error(err.message);
        self.setLoading(false);
      });
  }

  loadPage(page, pageSize) {
    this.setLoading(true);

    let self = this;
    const { cookies } = self.props;

    axios({
      method: "GET",
      url: utils.getDomain() + "api/cashFlow/global",
      // headers: { token: cookies.get("token") },
      // data: { page: page, limit: pageSize },
    })
      .then(function (res) {
        console.log(res.data.data.cashflows.$values);
        console.log(res.data);
        self.setLoading(false);
        if (400 === res.status) {
          return self.props.history.push("/login");
        } else if (200 === res.status) {
          self.setState({
            dataSource: res.data.data.cashflows.$values,
            count: res.data.data.cashflows.$values.length,
          });
        } else {
          message.error(res.statusText);
        }
      })
      .catch(function (err) {
        message.error(err.message);
        self.setLoading(false);
      });
  }

  componentDidMount() {
    window.document.title = "User - JLLSS";

    this.loadPage(1, 20);

    let action = {
      type: "setMenuItem",
      value: ["/main/cashFlow"],
    };
    store.dispatch(action);
  }

  reloadPage() {
    this.setState({ bSearchMode: false });
    this.loadPage(1, 20);
  }

  onTableTitle() {
    return (
      // Click to go create user page
      <Row>
        <Col span="18"></Col>
        <Col span="6" style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={this.onAddSupplier}
          >
            Add cashflow
          </Button>
        </Col>
      </Row>
    );
  }

  searchCashflow(value) {
    let self = this;
    const { cookies } = self.props;

    axios({
      method: "POST",
      url: utils.getDomain() + "api/cashFlow/search",
      // headers: { token: cookies.get("token") },
      data: {
        cashFlowId: 0,
        type: "",
        amount: 0,
        projectType: "",
        description: value,
      },
    })
      .then(function (res) {
        self.setLoading(false);
        if (400 === res.status) {
          return self.props.history.push("/login");
        } else if (200 === res.status) {
          console.log(res.data.data);
          self.setState({
            dataSource: res.data.data.cashflow.$values,
            count: res.data.data.cashflow.$values.length,
          });
        } else {
          message.error(res.statusText);
        }
      })
      .catch(function (err) {
        message.error(err.message);
        self.setLoading(false);
      });
  }

  searchCashflowAmount(value) {
    let self = this;
    const { cookies } = self.props;
    if (value === "") {
      value = 0;
    }
    axios({
      method: "POST",
      url: utils.getDomain() + "api/cashFlow/search",
      // headers: { token: cookies.get("token") },
      data: {
        cashFlowId: 0,
        type: "",
        amount: value,
        projectType: "",
        description: "",
      },
    })
      .then(function (res) {
        self.setLoading(false);
        if (400 === res.status) {
          return self.props.history.push("/login");
        } else if (200 === res.status) {
          console.log(res.data.data);
          self.setState({
            dataSource: res.data.data.cashflow.$values,
            count: res.data.data.cashflow.$values.length,
          });
        } else {
          message.error(res.statusText);
        }
      })
      .catch(function (err) {
        message.error(err.message);
        self.setLoading(false);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Row span="24">
            <Input.Search
              placeholder="Search Company"
              onSearch={(value) => {
                this.setState({ bSearchMode: true });
                this.searchCashflow(value);
              }}
              style={{ width: 200, marginBottom: 10 }}
            />
          </Row>
          <Row span="24">
            <Input.Search
              placeholder="Search Amount"
              onSearch={(value) => {
                this.setState({ bSearchMode: true });
                this.searchCashflowAmount(value);
              }}
              style={{ width: 200, marginBottom: 10 }}
            />
          </Row>
        </Row>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          pagination={{
            position: ["bottomLeft"],
            total: this.state.count,
            showTotal: (total, range) => `Total: ${total} `,
            pageSize: this.state.limit,
            showQuickJumper: true,
            onChange: this.onPageChange,
            pageSizeOptions: [20, 100, 500],
            onShowSizeChange: this.onShowSizeChange,
          }}
          title={this.onTableTitle}
          rowKey={(record) => record.id}
        />
      </div>
    );
  }
}

export default withCookies(CashFlow);
