import { USER_PASSWORD_ROUTE } from "../../common/urls";

class Account extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);

        this.onFinish = this.onFinish.bind(this);
    }

    componentDidMount() {
        window.document.title = "Account";

        let action = {
            type: "setMenuItem",
            value: ["/main/account"],
        };
        store.dispatch(action);
    }

    setLoading(bLoading) {
        let action = {
            type: "setLoading",
            value: bLoading,
        };

        store.dispatch(action);
    }

    onFinish(values) {
        if (values.password !== values.confirm) {
            message.error("Password doesn not match");
            return;
        }

        this.setLoading(true);

        let self = this;
        const { cookies } = self.props;
        // Password API
        axios({
            method: "POST",
            url: USER_PASSWORD_ROUTE,
            headers: { token: cookies.get("token") },
            data: values,
        })
            .then(function (res) {
                if (1 === res.data.code) {
                    self.props.history.replace("/");
                }
                else if (0 === res.data.code) {
                    cookies.set("token", res.data.data.token, { path: "/" });
                    message.success("Password updated");
                } else {
                    message.error(res.data.message);
                }
                self.setLoading(false);
            })
            .catch(function (err) {
                message.error(err.message);
                self.setLoading(false);
            });
    }

    render() {
        return (<></>);
    }
}