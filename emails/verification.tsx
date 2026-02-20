import {
  Html,
  Head,
  Preview,
  Section,
  Font,
  Row,
  Heading,
  Text,
} from "@react-email/components";

interface EmailTemplate {
  username: string;
  otp: string;
}

export default function EmailTemplateVerification({
  username,
  otp,
}: EmailTemplate) {
  return (
    <>
      <Html lang="en">
        <Head>
          <Font
            fontFamily="lusitana"
            fallbackFontFamily="Arial"
            fontWeight={400}
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
          />
        </Head>

        <Preview>{otp}</Preview>

        <Section className="bg-gray-100 text-black max-w-xl mt-3 mb-3 py-2 px-2 mx-auto justify-items-center text-center">
          <Row>
            <Heading
              as="h2"
              className="text-3xl bg-gray-300 font-bold rounded "
            >
              Welcome {username} Thanks for joining us
            </Heading>
          </Row>

          <Row>
            <Text className="text-center text-lg">
              We're excited to have you on board! To get started, please verify
              your email address by clicking the button below. This ensures your
              account remains secure and you receive important updates.Please
              look at the otp given below:
            </Text>
          </Row>
          <Row className="bg-gray-300 text-3xl">{otp}</Row>
          <Row>
            <Text className="flex justify-center text-center text-sm ">
              If you did not asked for that email simply ignore this or let us
              know about the security threats.
            </Text>
          </Row>
        </Section>
      </Html>
    </>
  );
}
