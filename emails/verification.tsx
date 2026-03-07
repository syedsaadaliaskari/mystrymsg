import {
  Html,
  Head,
  Preview,
  Section,
  Font,
  Row,
  Heading,
  Text,
  Tailwind,
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
            fontFamily="Lusitana"
            fallbackFontFamily="Arial"
            fontWeight={400}
            webFont={{
              url: "https://fonts.gstatic.com/s/lusitana/v13/K6173cHm2ndAs29q0f27W_K5.woff2",
              format: "woff2",
            }}
          />
        </Head>

        <Preview>{otp}</Preview>
        <Tailwind>
          <Section className="bg-gray-100 text-black max-w-xl my-4 py-8 px-6 mx-auto text-center rounded-lg border border-solid border-gray-200">
            <Row>
              <Heading
                as="h2"
                className="text-2xl bg-gray-300 font-bold rounded py-4 px-2"
              >
                Welcome {username} Thanks for joining us
              </Heading>
            </Row>

            <Row>
              <Text className="text-center text-lg leading-relaxed pt-4">
                We're excited to have you on board! To get started, please
                verify your email address by clicking the button below. This
                ensures your account remains secure and you receive important
                updates.Please look at the otp given below:
              </Text>
            </Row>
            <Row className="bg-gray-300 text-3xl font-mono font-bold py-4 rounded tracking-[10px]">
              {otp}
            </Row>
            <Row>
              <Text className="text-center text-sm text-gray-500 pt-6">
                If you did not asked for that email simply ignore this or let us
                know about the security threats.
              </Text>
            </Row>
          </Section>
        </Tailwind>
      </Html>
    </>
  );
}
