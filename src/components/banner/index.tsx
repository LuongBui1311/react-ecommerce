import { Button, Card, Flex, Typography } from "antd";

const Banner = () => {
    return (
        <Card className="banner">
            <Flex vertical gap="30px">
                <Flex vertical align="flex-start">
                    <Typography.Title level={2} className="title" >
                        Create and sell products
                    </Typography.Title>
                    <Typography.Text className="text">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus cupiditate soluta aut voluptate perspiciatis repellendus accusantium eligendi amet quibusdam suscipit quidem necessitatibus, iure delectus dolorum, ut exercitationem, aliquid iste asperiores!
                    </Typography.Text>
                </Flex>
                <Flex gap="large" className="btn-group">
                    <Button type="primary" className="btn">
                        Explore More
                    </Button>
                    <Button className="btn">Top Sellers</Button>
                </Flex>
            </Flex>
        </Card>
    );
}

export default Banner;