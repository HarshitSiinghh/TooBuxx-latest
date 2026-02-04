
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  // SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
 import { SafeAreaView } from "react-native-safe-area-context";
import { MoveLeft, CheckCircle2, User, ShieldCheck, Calendar } from "lucide-react-native";
import { useRouter } from "expo-router";

type ApprovedKYCProps = {
  nominee?: {
    nominee_name?: string;
    nominee_relation?: string;
    approved_at?: string;
  };
};
const router = useRouter()
const ApprovedKYC: React.FC<ApprovedKYCProps> = ({ nominee }) => {

  // ✅ backend se aane wala real data
  const nomineeDetails = {
    name: nominee?.nominee_name || "N/A",
    relation: nominee?.nominee_relation || "N/A",
    status: "Verified",
    approvalDate: nominee?.approved_at
      ? new Date(nominee.approved_at).toDateString()
      : "N/A",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20}>
          <MoveLeft size={20}   color="#9ca3af" onPress={()=>router.push("/(tabs)")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC STATUS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          
          {/* Success Section */}
          <View style={styles.successHeader}>
            <View style={styles.iconOuterCircle}>
              <View style={styles.iconInnerCircle}>
                <CheckCircle2 size={50} color="#10b981" strokeWidth={2.5} />
              </View>
            </View>
            <Text style={styles.statusTitle}>KYC Approved</Text>
            <Text style={styles.statusSubtitle}>Your nominee details are verified</Text>
          </View>

          {/* Nominee Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionLabel}>NOMINEE INFORMATION</Text>
            
            <View style={styles.detailRow}>
              <View style={styles.labelGroup}>
                <User size={16} color="#9ca3af" />
                <Text style={styles.detailLabel}>Full Name</Text>
              </View>
              <Text style={styles.detailValue}>{nomineeDetails.name}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.labelGroup}>
                <ShieldCheck size={16} color="#9ca3af" />
                <Text style={styles.detailLabel}>Relation</Text>
              </View>
              <Text style={styles.detailValue}>{nomineeDetails.relation}</Text>
            </View>

            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <View style={styles.labelGroup}>
                <Calendar size={16} color="#9ca3af" />
                <Text style={styles.detailLabel}>Approved On</Text>
              </View>
              <Text style={styles.detailValue}>{nomineeDetails.approvalDate}</Text>
            </View>
          </View>

          {/* Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>FULLY COMPLIANT</Text>
            </View>
          </View>

          {/* Action */}
          <TouchableOpacity style={styles.doneButton} onPress={()=>router.push("/(tabs)")}>
            <Text style={styles.doneButtonText}> GO TO DASHBOARD</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApprovedKYC;









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062530",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#104e64",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 16,
    letterSpacing: 1.5,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#0b3442",
    borderRadius: 40,
    padding: 30,
    borderWidth: 1,
    borderColor: "#104e64",
    shadowColor: "#041d26",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 8,
  },

  successHeader: {
    alignItems: "center",
    marginBottom: 35,
  },

  iconOuterCircle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "rgba(34,197,94,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  iconInnerCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#062530",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.4)",
  },

  statusTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },

  statusSubtitle: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  detailsContainer: {
    backgroundColor: "rgba(16,78,100,0.35)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#104e64",
  },

  sectionLabel: {
    color: "#facc15",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 15,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(16,78,100,0.4)",
  },

  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailLabel: {
    color: "#8fbac4",
    fontSize: 13,
  },

  detailValue: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },

  badgeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  verifiedBadge: {
    backgroundColor: "rgba(34,197,94,0.18)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#22c55e",
  },

  verifiedText: {
    color: "#22c55e",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  doneButton: {
    backgroundColor: "#facc15",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  doneButtonText: {
    color: "#062530",
    fontWeight: "900",
    letterSpacing: 1.5,
    fontSize: 13,
  },
});
