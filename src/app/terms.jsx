import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

function SectionBlock({ number, title, children }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        {number}. {title}
      </Text>
      {children}
    </View>
  );
}

function BulletItem({ bold, text }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 6, paddingLeft: 8 }}>
      <Text style={{ color: "#6B7280", marginRight: 8 }}>•</Text>
      <Text style={{ flex: 1, fontSize: 14, color: "#4B5563", lineHeight: 21 }}>
        {bold ? <Text style={{ fontWeight: "600" }}>{bold}</Text> : null}
        {bold ? " — " : ""}
        {text}
      </Text>
    </View>
  );
}

function BodyText({ children, style }) {
  return (
    <Text style={[{ fontSize: 14, color: "#4B5563", lineHeight: 21 }, style]}>
      {children}
    </Text>
  );
}

export default function TermsOfServiceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#F3F4F6",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <ChevronLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
          Terms of Service
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title area */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "#111827",
            marginBottom: 4,
          }}
        >
          Simply Food Facts
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#9CA3AF",
            marginBottom: 16,
          }}
        >
          Effective Date: March 1, 2026
        </Text>

        <BodyText style={{ marginBottom: 24 }}>
          Please read these Terms of Service ("Terms") carefully before using
          the Simply Food Facts mobile application ("App"). By downloading,
          installing, or using the App, you agree to be bound by these Terms. If
          you do not agree, do not use the App.
        </BodyText>

        {/* Section 1 */}
        <SectionBlock number="1" title="Acceptance of Terms">
          <BodyText>
            By accessing or using Simply Food Facts, you confirm that you have
            read, understood, and agree to these Terms and our Privacy Policy.
            We may update these Terms from time to time. Continued use of the
            App after changes are posted constitutes your acceptance of the
            revised Terms.
          </BodyText>
        </SectionBlock>

        {/* Section 2 */}
        <SectionBlock number="2" title="Description of Service">
          <BodyText style={{ marginBottom: 8 }}>
            Simply Food Facts is a barcode scanning app that allows you to:
          </BodyText>
          <BulletItem text="Scan product barcodes to view ingredient and nutritional information" />
          <BulletItem text="Set custom ingredient alerts to flag specific ingredients" />
          <BulletItem text="Browse your scan history for previously scanned products" />
          <BulletItem text="View allergen, additive, and nutritional data sourced from Open Food Facts" />
          <BulletItem text="Optionally support the app through voluntary in-app purchases (Tip Jar)" />
          <BodyText style={{ marginTop: 8 }}>
            The App is provided as a reference tool only and is not a substitute
            for reading the actual product label or seeking professional advice.
          </BodyText>
        </SectionBlock>

        {/* Section 3 */}
        <SectionBlock number="3" title="In-App Purchases & Tip Jar">
          <BodyText style={{ marginBottom: 8 }}>
            Simply Food Facts offers an optional Tip Jar feature, which allows
            you to make voluntary, one-time in-app purchases to support the
            app's ongoing development and maintenance.
          </BodyText>
          <BulletItem
            bold="Voluntary"
            text="Tips are entirely optional. The app is fully functional without any purchase."
          />
          <BulletItem
            bold="No additional features"
            text="Tips do not unlock premium features, remove ads, or provide any additional content or functionality."
          />
          <BulletItem
            bold="Non-refundable"
            text="All tip purchases are final. Refund requests must be directed to Apple through the App Store."
          />
          <BulletItem
            bold="Pricing"
            text="Tip amounts are displayed in the app at the time of purchase. Prices may vary by region and are subject to change."
          />
          <BulletItem
            bold="Payment processing"
            text="All purchases are processed by Apple through the App Store. We do not collect or store any payment information."
          />
          <BulletItem
            bold="Purchase management"
            text="In-app purchase transactions are managed through RevenueCat, a third-party service. RevenueCat receives only anonymous transaction data."
          />
          <BodyText style={{ marginTop: 8 }}>
            By making a purchase through the Tip Jar, you agree to Apple's
            standard terms and conditions for in-app purchases, including their
            refund and cancellation policies.
          </BodyText>
        </SectionBlock>

        {/* Section 4 */}
        <SectionBlock number="4" title="Eligibility">
          <BodyText>
            You must be at least 13 years of age to use this App. By using the
            App, you represent that you meet this age requirement. If you are
            under 18, you should use the App only with the involvement of a
            parent or guardian.
          </BodyText>
        </SectionBlock>

        {/* Section 5 */}
        <SectionBlock number="5" title="No Medical or Health Advice">
          <View
            style={{
              backgroundColor: "#FEF3C7",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#92400E",
                marginBottom: 6,
              }}
            >
              ⚠️ Important
            </Text>
            <Text style={{ fontSize: 13, color: "#92400E", lineHeight: 19 }}>
              The App does not provide medical advice, diagnosis, or treatment.
              Information displayed is for general informational purposes only.
            </Text>
          </View>
          <BulletItem text="Do not rely on the App as your sole source of allergy or dietary information." />
          <BulletItem text="Always read the physical product label before consuming any food product." />
          <BulletItem text="Consult a qualified healthcare provider or registered dietitian for personalized advice regarding food allergies, intolerances, or dietary needs." />
          <BulletItem text="In the event of a suspected allergic reaction, seek immediate medical attention." />
        </SectionBlock>

        {/* Section 6 */}
        <SectionBlock number="6" title="Accuracy of Information">
          <BodyText style={{ marginBottom: 8 }}>
            Product data displayed in the App is sourced from Open Food Facts, a
            crowdsourced database. While we strive to present accurate
            information, we cannot guarantee:
          </BodyText>
          <BulletItem text="The completeness, accuracy, or timeliness of any product data" />
          <BulletItem text="That ingredient lists reflect the most current product formulation" />
          <BulletItem text="That allergen or cross-contamination information is exhaustive" />
          <BulletItem text="That regional or country-specific product variations are accounted for" />
          <BodyText style={{ marginTop: 8 }}>
            Manufacturers may change product ingredients, formulations, or
            labeling at any time without notice. You are solely responsible for
            verifying all product information on the physical packaging.
          </BodyText>
        </SectionBlock>

        {/* Section 7 */}
        <SectionBlock number="7" title="User Responsibilities">
          <BodyText style={{ marginBottom: 8 }}>
            When using the App, you agree to:
          </BodyText>
          <BulletItem text="Use the App for lawful purposes only" />
          <BulletItem text="Verify product information against the physical product label before consumption" />
          <BulletItem text="Not rely solely on the App for allergy or dietary decisions" />
          <BulletItem text="Not use the App in a way that could damage, disable, or impair the service" />
          <BulletItem text="Not attempt to gain unauthorized access to any part of the App or its systems" />
        </SectionBlock>

        {/* Section 8 */}
        <SectionBlock number="8" title="Intellectual Property">
          <BodyText>
            All content, design, graphics, and code within the App are the
            property of Simply Food Facts or its licensors and are protected by
            applicable intellectual property laws. Product data is provided by
            Open Food Facts under the Open Database License (ODbL). You may not
            copy, modify, distribute, or create derivative works from the App
            without our prior written consent.
          </BodyText>
        </SectionBlock>

        {/* Section 9 */}
        <SectionBlock number="9" title="Third-Party Services">
          <BodyText style={{ marginBottom: 8 }}>
            The App integrates with the following third-party service:
          </BodyText>
          <BulletItem
            bold="Open Food Facts"
            text="An open, crowdsourced database of food products. We are not responsible for the accuracy, availability, or content of data provided by Open Food Facts."
          />
          <BodyText style={{ marginTop: 8 }}>
            We are not affiliated with, endorsed by, or responsible for any
            third-party services, brands, or products displayed in the App.
          </BodyText>
        </SectionBlock>

        {/* Section 10 */}
        <SectionBlock number="10" title="Disclaimer of Warranties">
          <BodyText>
            The App is provided on an "AS IS" and "AS AVAILABLE" basis without
            warranties of any kind, either express or implied, including but not
            limited to implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not warrant that the
            App will be uninterrupted, error-free, secure, or free from viruses
            or other harmful components.
          </BodyText>
        </SectionBlock>

        {/* Section 11 */}
        <SectionBlock number="11" title="Limitation of Liability">
          <BodyText>
            To the fullest extent permitted by applicable law, Simply Food Facts
            and its developers, officers, employees, and affiliates shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to personal injury,
            allergic reactions, health complications, loss of data, or loss of
            profits, arising out of or in connection with your use of the App —
            whether based on warranty, contract, tort, or any other legal
            theory, and whether or not we have been advised of the possibility
            of such damages.
          </BodyText>
        </SectionBlock>

        {/* Section 12 */}
        <SectionBlock number="12" title="Indemnification">
          <BodyText>
            You agree to indemnify, defend, and hold harmless Simply Food Facts
            and its developers from and against any claims, liabilities,
            damages, losses, or expenses (including reasonable attorneys' fees)
            arising out of or in any way connected with your use of the App,
            your violation of these Terms, or your reliance on information
            provided by the App.
          </BodyText>
        </SectionBlock>

        {/* Section 13 */}
        <SectionBlock number="13" title="Termination">
          <BodyText>
            We reserve the right to suspend or terminate your access to the App
            at any time, without prior notice, for any reason, including
            violation of these Terms. You may stop using the App and uninstall
            it at any time. Upon termination, all locally stored data will be
            deleted when the App is removed from your device.
          </BodyText>
        </SectionBlock>

        {/* Section 14 */}
        <SectionBlock number="14" title="Governing Law">
          <BodyText>
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which Simply Food Facts operates,
            without regard to its conflict of law provisions. Any disputes
            arising under these Terms shall be resolved in the competent courts
            of that jurisdiction.
          </BodyText>
        </SectionBlock>

        {/* Section 15 */}
        <SectionBlock number="15" title="Changes to These Terms">
          <BodyText>
            We may revise these Terms at any time by posting the updated version
            within the App. The "Effective Date" at the top will be updated to
            reflect the latest revision. Your continued use of the App after any
            changes constitutes acceptance of the new Terms.
          </BodyText>
        </SectionBlock>

        {/* Section 16 */}
        <SectionBlock number="16" title="Contact Us">
          <BodyText>
            If you have questions about these Terms, please contact us at{" "}
            <Text style={{ fontWeight: "600", color: "#2563EB" }}>
              SimplyFoodFacts@gmail.com
            </Text>
            .
          </BodyText>
        </SectionBlock>

        {/* Footer */}
        <View
          style={{
            marginTop: 12,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              textAlign: "center",
            }}
          >
            Simply Food Facts · Terms of Service · Last updated March 1, 2026
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
