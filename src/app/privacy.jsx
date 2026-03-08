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

function SubsectionBlock({ title, children }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#374151",
          marginBottom: 6,
        }}
      >
        {title}
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

export default function PrivacyPolicyScreen() {
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
          Privacy Policy
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
          Simply Food Facts ("we," "us," or "our") is a barcode scanning app
          that helps you view ingredient and nutritional information for food
          products. This Privacy Policy explains what data we collect, how we
          use it, and your choices.
        </BodyText>

        {/* Section 1 */}
        <SectionBlock number="1" title="Information We Collect">
          <SubsectionBlock title="a) Data You Provide Through Use">
            <BulletItem
              bold="Barcode scans"
              text="When you scan a product barcode, the barcode number and product name are recorded in your scan history."
            />
            <BulletItem
              bold="Ingredient alerts"
              text='Custom ingredient alerts you create (e.g., "Aspartame," "Red 40") are stored so the app can flag those ingredients in future scans.'
            />
          </SubsectionBlock>

          <SubsectionBlock title="b) Data Stored on Your Device">
            <BulletItem
              bold="App preferences"
              text="Settings such as font size and display options are stored locally on your device and are never transmitted to our servers."
            />
          </SubsectionBlock>

          <SubsectionBlock title="c) Camera Access">
            <BodyText>
              The app requests access to your device's camera solely to scan
              product barcodes. Camera images are processed on-device in real
              time and are never captured, stored, or transmitted.
            </BodyText>
          </SubsectionBlock>

          <SubsectionBlock title="d) Data We Do Not Collect">
            <BodyText style={{ marginBottom: 6 }}>
              We do not collect or process:
            </BodyText>
            <BulletItem text="Names, email addresses, or account credentials" />
            <BulletItem text="Location data" />
            <BulletItem text="Device identifiers or advertising IDs" />
            <BulletItem text="Health or medical data" />
            <BulletItem text="Analytics or usage tracking beyond scan history" />
            <BulletItem text="Photos or camera images" />
          </SubsectionBlock>
        </SectionBlock>

        {/* Section 2 */}
        <SectionBlock number="2" title="How We Use Your Data">
          <BulletItem
            bold="Scan history"
            text="To show you previously scanned products for easy reference."
          />
          <BulletItem
            bold="Ingredient alerts"
            text="To flag matching ingredients when you view a product's details."
          />
          <BodyText style={{ marginTop: 8 }}>
            We do not use your data for advertising, profiling, or any purpose
            other than providing the app's core features.
          </BodyText>
        </SectionBlock>

        {/* Section 3 */}
        <SectionBlock number="3" title="In-App Purchases">
          <BodyText style={{ marginBottom: 8 }}>
            Simply Food Facts offers an optional Tip Jar feature that allows you
            to make voluntary, one-time in-app purchases to support the app's
            development.
          </BodyText>

          <SubsectionBlock title="a) Payment Processing">
            <BodyText>
              All in-app purchases are processed by Apple through the App Store.
              We do not collect, store, or have access to your payment
              information, credit card details, or billing address. All payment
              data is handled entirely by Apple in accordance with their privacy
              policies.
            </BodyText>
          </SubsectionBlock>

          <SubsectionBlock title="b) Purchase Records">
            <BodyText>
              We use RevenueCat, a third-party purchase management service, to
              process and validate in-app purchases. RevenueCat may receive an
              anonymous identifier associated with your purchase to manage
              transaction records. No personal information is shared with
              RevenueCat.
            </BodyText>
          </SubsectionBlock>

          <SubsectionBlock title="c) What Tips Do Not Do">
            <BulletItem text="Tips do not unlock any additional features or content" />
            <BulletItem text="Tips do not create an account or require personal information" />
            <BulletItem text="Tips are entirely voluntary and are not required to use the app" />
          </SubsectionBlock>
        </SectionBlock>

        {/* Section 4 */}
        <SectionBlock number="4" title="Third-Party Services">
          <SubsectionBlock title="Open Food Facts">
            <BodyText>
              When you scan a barcode, the app may query the Open Food Facts API
              to retrieve product information (name, ingredients, allergens,
              nutritional data, and product images). Only the barcode number is
              sent in the request. No personal data is shared with Open Food
              Facts. Open Food Facts maintains its own privacy policy and data
              protection practices that provide equal or greater protection of
              user data as outlined in this policy and as required by applicable
              privacy laws and App Store Guidelines.
            </BodyText>
          </SubsectionBlock>

          <SubsectionBlock title="RevenueCat">
            <BodyText>
              We use RevenueCat to manage in-app purchase transactions.
              RevenueCat processes anonymous transaction data only and provides
              the same or equal protection of user data as stated in this
              privacy policy and as required by App Store Guidelines. For more
              information, see RevenueCat's privacy policy at
              revenuecat.com/privacy.
            </BodyText>
          </SubsectionBlock>

          <BodyText>
            All third-party services used by this app are required to maintain
            data protection standards that meet or exceed those outlined in this
            privacy policy and comply with applicable privacy laws and App Store
            Guidelines.
          </BodyText>

          <BodyText style={{ marginTop: 8 }}>
            We do not integrate any third-party analytics, advertising, or
            tracking services.
          </BodyText>
        </SectionBlock>

        {/* Section 5 */}
        <SectionBlock number="5" title="Data Storage and Retention">
          <BulletItem text="Your data is stored on secure cloud-hosted databases within the United States." />
          <BulletItem text="Scan history and ingredient alerts are stored in a secure database." />
          <BulletItem text="Scan history older than 30 days is automatically deleted." />
          <BulletItem text="You can manually delete all scan history or ingredient alerts at any time in Settings." />
          <BulletItem text="App preferences are stored only on your device and are removed when you uninstall the app." />
          <BulletItem text="In-app purchase transaction records are managed by Apple and RevenueCat. We do not store purchase history on our servers." />
        </SectionBlock>

        {/* Section 6 */}
        <SectionBlock number="6" title="Data Sharing">
          <BodyText>
            We do not sell, rent, trade, or share your data with any third
            parties. The only external communications are the barcode lookup
            request sent to Open Food Facts (which contains no personal
            information) and anonymous purchase validation through RevenueCat.
          </BodyText>
        </SectionBlock>

        {/* Section 7 */}
        <SectionBlock number="7" title="Your Rights and Choices">
          <BulletItem
            bold="Delete scan history"
            text='Use "Clear Scan History" in Settings.'
          />
          <BulletItem
            bold="Delete ingredient alerts"
            text='Use "Clear All Alerts" in Settings.'
          />
          <BulletItem
            bold="Camera access"
            text="You can revoke permission in system settings."
          />
          <BulletItem
            bold="In-app purchases"
            text="You can manage or request refunds for purchases through the App Store."
          />
          <BulletItem
            bold="Uninstall"
            text="Removing the app deletes all locally stored preferences."
          />
        </SectionBlock>

        {/* Section 8 */}
        <SectionBlock number="8" title="Children's Privacy">
          <BodyText>
            Simply Food Facts is not directed at children under 13. We do not
            knowingly collect personal information from children. The app does
            not require account creation and does not collect personal
            identifiers.
          </BodyText>
        </SectionBlock>

        {/* Section 9 */}
        <SectionBlock number="9" title="Security">
          <BodyText>
            We use industry-standard measures to protect stored data. However,
            no method of electronic storage is 100% secure.
          </BodyText>
        </SectionBlock>

        {/* Section 10 */}
        <SectionBlock number="10" title="Changes to This Policy">
          <BodyText>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will update the "Effective Date." Continued use
            of the app after changes constitutes acceptance.
          </BodyText>
        </SectionBlock>

        {/* Section 11 */}
        <SectionBlock number="11" title="Contact Us">
          <BodyText>
            If you have questions, contact us at{" "}
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
            Simply Food Facts · Privacy Policy · Last updated March 1, 2026
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
