import React from "react";
import { Link } from "react-router-dom";
import { Space, Row, Col, Popconfirm, Table, message, Button } from "antd";
import axios from "axios";
import utils from "../../common/Utils";
import { UserAddOutlined, EditOutlined } from "@ant-design/icons";
import store from "../../store";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class User extends React.Component {
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
              dataIndex: "id",
              key: "id",
              width: 80,
            },
            {
              title: "UserName",
              dataIndex: "userName",
              key: "userName",
            },
            // {
            //   title: "Created",
            //   dataIndex: "created",
            //   key: "created",
            // },
            {
              title: "Expired",
              dataIndex: "expired",
              key: "expired",
            },
            {
              title: "Is Admin",
              key: "isAdmin",
              render: (text, record) => {
                return record.isAdmin ? "Yes" : "No";
              },
            },
            {
              title: "Action",
              key: "operation",
              fixed: "right",
              width: 150,
              render: (text, record) => (
                <Space>
                  {/* Link to edit user page */}
                  <Link to={"/main/user/edit/" + record.id}>
                    <Button type="primary" size="small" icon={<EditOutlined />}>
                      Edit
                    </Button>
                  </Link>

                  <Popconfirm
                    placement="right"
                    title="Are you sure to delete this user?"
                    onConfirm={() => this.handleDel(record.id)}
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
        this.props.history.push("/main/user/edit/0");
    }

    handleDel(id) {
      this.setLoading(true);

      let self = this;
      const { cookies } = self.props;
      // Delete user API
      axios({
        method: "POST",
        url: utils.getDomain() + "api/user/delete",
        headers: { token: cookies.get("token") },
        data: { id },
      })
        .then(function (res) {
          self.setLoading(false);
          if (1 === res.data.code) {
            return self.props.history.push("/login");
          } else if (0 === res.data.code) {
            self.reloadPage(1, self.state.limit);
          } else {
            message.error(res.data.message);
          }
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
            url: utils.getDomain() + "api/user/list",
            // headers: { token: cookies.get("token") },
            // data: { page: page, limit: pageSize },
        })
            .then(function (res) {
              console.log(res);
              console.log(res.data);
                self.setLoading(false);
                if (400 === res.status) {
                  return self.props.history.push("/login");
                } else if (200 === res.status) {
                  self.setState({
                    dataSource: res.data,
                    count: res.data.length,
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
          value: ["/main/user"],
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
                New User
              </Button>
            </Col>
          </Row>
        );
    }

    render() {
        return (
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
        );
    }
}

export default withCookies(User);
