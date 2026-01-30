import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Landmark, Smartphone, User, Hash, ShieldCheck } from "lucide-react-native";
import { MotiView } from "moti";

interface GlassInputProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
}

const GlassInput = ({ 
  label, 
  icon, 
  placeholder, 
  value, 
  onChange, 
  keyboardType = "default" 
}: GlassInputProps) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <TextInput
        value={value || ""}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#374151" // gray-700
        keyboardType={keyboardType}
        selectionColor="#a855f7" // purple-400
        style={styles.input}
      />
    </View>
  </View>
);

export const BankDetailForm = ({ data, setData }: { data: any, setData: any }) => (
  <MotiView 
    from={{ opacity: 0, translateX: 20 }} 
    animate={{ opacity: 1, translateX: 0 }} 
    style={styles.formSpacing}
  >
    <GlassInput 
      label="Account Holder Name" 
      icon={<User size={18} color="#6b7280"/>} 
      placeholder="JOHN DOE" 
      value={data.account_holder_name} 
      onChange={(val) => setData({...data, account_holder_name: val})} 
    />
    <GlassInput 
      label="Account Number" 
      icon={<Hash size={18} color="#6b7280"/>} 
      placeholder="0000 0000 0000" 
      keyboardType="numeric"
      value={data.account_number} 
      onChange={(val) => setData({...data, account_number: val})} 
    />
    <View style={styles.row}>
      <View style={styles.flex1}>
        <GlassInput 
          label="IFSC Code" 
          icon={<Landmark size={18} color="#6b7280"/>} 
          placeholder="SBIN000123" 
          value={data.ifsc_code} 
          onChange={(val) => setData({...data, ifsc_code: val})} 
        />
      </View>
      <View style={styles.flex1}>
        <GlassInput 
          label="Bank Name" 
          icon={<ShieldCheck size={18} color="#6b7280"/>} 
          placeholder="STATE BANK" 
          value={data.bank_name} 
          onChange={(val) => setData({...data, bank_name: val})} 
        />
      </View>
    </View>
  </MotiView>
);

export const UpiDetailForm = ({ data, setData }: { data: any, setData: any }) => (
  <MotiView 
    from={{ opacity: 0, translateX: -20 }} 
    animate={{ opacity: 1, translateX: 0 }} 
    style={styles.formSpacing}
  >
    <GlassInput 
      label="UPI ID" 
      icon={<Smartphone size={18} color="#6b7280"/>} 
      placeholder="username@upi" 
      value={data.upi_id} 
      onChange={(val) => setData({...data, upi_id: val})} 
    />
    <GlassInput 
      label="Verify Name" 
      icon={<User size={18} color="#6b7280"/>} 
      placeholder="JOHN DOE" 
      value={data.account_holder_name} 
      onChange={(val) => setData({...data, account_holder_name: val})} 
    />
  </MotiView>
);

const styles = StyleSheet.create({
  formSpacing: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: "900",
    color: "#c084fc", // purple-400
    letterSpacing: 2,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    zIndex: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flex1: {
    flex: 1,
  }
});