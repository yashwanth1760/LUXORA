import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  userName = "Yashwanth",
  type = "monthly-report",
  data = {
    month: "December",
    stats: {
      totalIncome: 5000,
      totalExpenses: 3500,
      byCategory: {
        housing: 1500,
        groceries: 600,
        transportation: 400,
        entertainment: 300,
        utilities: 700,
      },
    },
    insights: [
      "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
      "Great job keeping entertainment expenses under control this month!",
      "Setting up automatic savings could help you save 20% more of your income.",
    ],
  },
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Monthly Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for {data?.month}:
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>${data?.stats.totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>${data?.stats.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>
                  ${data?.stats.totalIncome - data?.stats.totalExpenses}
                </Text>
              </div>
            </Section>

            {data?.stats?.byCategory && (
              <Section style={styles.statsContainer}>
                <Text style={styles.heading}>Expenses by Category</Text>
                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.stat}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.heading}>${amount}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {data?.insights?.length > 0 && (
              <Section style={styles.statsContainer}>
                <Text style={styles.heading}>Welth Insights</Text>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth. Stay financially healthy!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {data?.percentageUsed.toFixed(1)}% of your
              monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>${data?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>${data?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ${data?.budgetAmount - data?.totalExpenses}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    background: "linear-gradient(to bottom, #fffbe6, #fff1cc)", // light gold gradient
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #f3c766", // soft golden border
  },
  title: {
    color: "#d4af37", // rich gold
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 16px",
  },
  text: {
    color: "#3b3b3b",
    fontSize: "16px",
    margin: "0 0 12px",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#fffdf5",
    borderRadius: "8px",
    border: "1px solid #f3c766",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff8e1",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
    border: "1px solid #f0c14b",
  },
  footer: {
    color: "#a78f44",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
